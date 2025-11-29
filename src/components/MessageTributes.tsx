import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Skeleton,
} from "@mui/material";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../hooks/useAuth";
import { useQuery, useInfiniteQuery, useMutation } from "@tanstack/react-query";

interface MessageTributesProps {
  memorialId: string;
  tab: number;
}

const fetchMessages = async ({ pageParam = 1, queryKey }: any) => {
  const memorialId = queryKey[1];

  const res = await axiosInstance.get(
    `/memorial/${memorialId}/messages?page=${pageParam}&limit=10`
  );

  return {
    messages: res.data.data,
    nextPage: res.data.hasMore ? pageParam + 1 : undefined,
  };
};

const MessageTributes = ({ memorialId, tab }: MessageTributesProps) => {
  const { user } = useAuth();

  // 🔥 Infinite Query for messages
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["tribute-messages", memorialId],
    queryFn: fetchMessages,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: tab === 1, // Load only when Messages tab is active
  });

  // 🔥 Mutation for posting a tribute message
  const addMessageMutation = useMutation({
    mutationFn: async (payload: any) =>
      axiosInstance.post(`/memorial/${memorialId}/messages`, payload),
    onSuccess: () => {
      refetch(); // refresh all messages
    },
  });

  // Infinite Scroll Listener
  useEffect(() => {
    if (tab !== 1) return;

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tab, hasNextPage, isFetchingNextPage]);

  const allMessages = data?.pages?.flatMap((page) => page.messages) ?? [];

  const MessageInput = ({ onSubmit }: any) => {
    const [text, setText] = useState("");

    const send = () => {
      if (!text.trim()) return;
      onSubmit(text);
      setText("");
    };

    return (
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #fff7f0, #fffcfa)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ color: "#8b5e3c", mb: 1 }}
        >
          Leave a Tribute
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: "#6d4c41" }}>
          Share a warm memory, offer your love, or celebrate their legacy. Your
          words become part of this special remembrance.
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something from the heart…"
          sx={{
            background: "white",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.3,
            borderRadius: 3,
            fontSize: "1rem",
            fontWeight: 600,
            background: "linear-gradient(135deg, #8b5e3c, #a47148)",
            "&:hover": {
              background: "linear-gradient(135deg, #7a4f31, #8c603a)",
            },
            textTransform: "none",
          }}
          onClick={send}
        >
          Post Tribute
        </Button>
      </Box>
    );
  };

  return (
    <Box>
      {/* Add Message */}
      {user && (
        <MessageInput
          onSubmit={(text) =>
            addMessageMutation.mutate({ message: text, type: "text" })
          }
        />
      )}

      <Typography
        variant="h5"
        fontWeight={700}
        sx={{ color: "#0b2c52", mb: 3 }}
      >
        Heartfelt Messages
      </Typography>

      {/* Loading state */}
      {isLoading && (
        <Box>
          {[1, 2, 3].map((s) => (
            <Skeleton key={s} height={90} sx={{ mb: 2 }} />
          ))}
        </Box>
      )}

      {/* No Messages */}
      {!isLoading && allMessages.length === 0 && (
        <Typography color="text.secondary">
          No messages yet — be the first to honor their memory.
        </Typography>
      )}

      {/* Message List */}
      {allMessages.map((t) => (
        <Paper
          key={t._id}
          sx={{
            p: 2.5,
            mb: 2,
            borderRadius: 2,
            backgroundColor: "#fffaf3",
            borderLeft: "4px solid #b68b43",
          }}
        >
          <Typography fontWeight={700} sx={{ color: "#0b2c52" }}>
            {t.userId?.name}
          </Typography>

          <Typography sx={{ mt: 1 }}>{t.message}</Typography>

          <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
            {new Date(t.createdAt).toLocaleString()}
          </Typography>
        </Paper>
      ))}

      {isFetchingNextPage && (
        <Box sx={{ mt: 2 }}>
          <Skeleton height={80} sx={{ mb: 2 }} />
        </Box>
      )}
    </Box>
  );
};

export default MessageTributes;
