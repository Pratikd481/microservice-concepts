import express from 'express'

const app = express()

app.use(express.json());

app.post("/user", async (req, res) => {
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    const { id } = req.body;

    if(Math.random() < 0.3) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json({ id, name: "Pratik", role: "Engineer" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
