    import { useState, useEffect, useRef } from "react";
    import {
    Box,
    Typography,
    Paper,
    Button,
    Skeleton,
    } from "@mui/material";
    import axiosInstance from "../api/axiosInstance";
    import { useAuth } from "../hooks/useAuth";
    import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

    interface AudioTributesProps {
    memorialId: string;
    tab: number; // load only when tab is active
    isUser:boolean;
    }

    const AudioTributes = ({ memorialId, tab,isUser }: AudioTributesProps) => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [page, setPage] = useState(1);
    const isOwner=user.id===memorialId

    // -----------------------------
    // FETCH AUDIO LIST (paginated)
    // -----------------------------
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
    } = useQuery({
        queryKey: ["audios", memorialId],
        queryFn: async ({ pageParam = 1 }) => {
        const res = await axiosInstance.get(
            `/memorial/${memorialId}/media?type=audio&page=${pageParam}&limit=10`
        );
        return res.data;
        },
        getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length + 1 : undefined,
        enabled: tab === 2, // Only load when Audio tab is active
    });

    const audios = data?.pages?.flatMap((p) => p.data) ?? [];

    // -----------------------------
    // INFINITE SCROLL
    // -----------------------------
    useEffect(() => {
        if (tab !== 2) return;

        const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 300 &&
            hasNextPage
        ) {
            fetchNextPage();
        }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, [tab, hasNextPage]);

    // -----------------------------------
    // ADD AUDIO (mutation)
    // -----------------------------------
    const uploadMutation = useMutation({
        mutationFn: async (file: File) => {
        const form = new FormData();
        form.append("media", file);

        return axiosInstance.post(
            `/memorial/${memorialId}/media`,
            form,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["audios", memorialId] });
        },
    });

    const handleUpload = (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("audio")) {
        alert("Only audio files are allowed!");
        return;
        }

        uploadMutation.mutate(file);
    };

    return (
        <Box>
        {/* ---------------------------
            UPLOAD AUDIO
        --------------------------- */}
        {isUser && (
            <Paper
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                background: "#f8f5ff",
            }}
            >
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                Add Audio Tribute
            </Typography>

            <Button
                variant="contained"
                sx={{
                background: "linear-gradient(135deg, #5a4fb8, #8675e4)",
                textTransform: "none",
                borderRadius: 2,
                }}
                onClick={() => fileInputRef.current?.click()}
            >
                Upload Audio
            </Button>

            <input
                type="file"
                ref={fileInputRef}
                hidden
                accept="audio/*"
                onChange={handleUpload}
            />

            {uploadMutation.isPending && (
                <Typography sx={{ mt: 1, color: "gray" }}>
                Uploading audio…
                </Typography>
            )}
            </Paper>
        )}

        {/* ---------------------------
            HEADING
        --------------------------- */}
        <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
            Audio Memories
        </Typography>

        {/* ---------------------------
            EMPTY STATE
        --------------------------- */}
        {audios.length === 0 && !isLoading && (
            <Typography color="text.secondary">
            No audio tributes yet — be the first to share.
            </Typography>
        )}

        {/* ---------------------------
            AUDIO LIST
        --------------------------- */}
        {audios.map((a) => (
            <Paper
            key={a._id}
            sx={{
                p: 2.5,
                mb: 2,
                borderRadius: 2,
                backgroundColor: "#fffaf7",
                borderLeft: "4px solid #7d5ab5",
            }}
            >
            <Typography fontWeight={700}>
                {a.userId?.name || "Someone"}
            </Typography>

            <audio
                controls
                src={a.url}
                style={{ width: "100%", marginTop: "10px" }}
            />

            <Typography
                variant="caption"
                sx={{ mt: 1, display: "block", color: "#6f4fa1" }}
            >
                {new Date(a.createdAt).toLocaleString()}
            </Typography>
            </Paper>
        ))}

        {/* ---------------------------
            LOADING SKELETON
        --------------------------- */}
        {isLoading && (
            <Box>
            {[1, 2].map((i) => (
                <Skeleton key={i} variant="rectangular" height={80} sx={{ mb: 2 }} />
            ))}
            </Box>
        )}
        </Box>
    );
    };

    export default AudioTributes;
