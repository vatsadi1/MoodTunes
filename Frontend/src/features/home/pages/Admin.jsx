import { useState } from "react";
import axios from "axios";

const Admin = () => {
    const [title, setTitle] = useState("");
    const [mood, setMood] = useState("happy");
    const [song, setSong] = useState(null);
    const [poster, setPoster] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !mood || !song || !poster) {
            return alert("Please fill all fields.");
        }

        try {
            setLoading(true);

            const formData = new FormData();

            formData.append("title", title);
            formData.append("mood", mood);
            formData.append("song", song);
            formData.append("poster", poster);

            const res = await axios.post(
                "http://localhost:3000/api/songs",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            alert(res.data.message);

            setTitle("");
            setMood("happy");
            setSong(null);
            setPoster(null);

            document.getElementById("song").value = "";
            document.getElementById("poster").value = "";

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: "500px",
                margin: "40px auto",
                padding: "25px",
                border: "1px solid #ddd",
                borderRadius: "10px",
            }}
        >
            <h2>Upload Song</h2>

            <form onSubmit={handleSubmit}>

                <div style={{ marginBottom: 15 }}>
                    <label>Song Title</label>
                    <br />
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                        style={{ width: "100%", padding: 10 }}
                    />
                </div>

                <div style={{ marginBottom: 15 }}>
                    <label>Mood</label>
                    <br />
                    <select
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        style={{ width: "100%", padding: 10 }}
                    >
                        <option value="happy">Happy</option>
                        <option value="sad">Sad</option>
                        <option value="angry">Angry</option>
                        <option value="calm">Calm</option>
                        <option value="romantic">Romantic</option>
                        <option value="surprised">Surprised</option>
                    </select>
                </div>

                <div style={{ marginBottom: 15 }}>
                    <label>Song (.mp3)</label>
                    <br />
                    <input
                        id="song"
                        type="file"
                        accept=".mp3,audio/*"
                        onChange={(e) => setSong(e.target.files[0])}
                    />
                </div>

                <div style={{ marginBottom: 20 }}>
                    <label>Poster</label>
                    <br />
                    <input
                        id="poster"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPoster(e.target.files[0])}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: "100%",
                        padding: "12px",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Uploading..." : "Upload Song"}
                </button>

            </form>
        </div>
    );
};

export default Admin;