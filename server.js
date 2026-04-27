import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

const IBM_API_KEY = "FA5NAEnVHuErhpjf61nKab4UerS9nKZlL2pmJnk_UnyJ";

app.get("/get-token", async (req, res) => {
    try {
        const response = await fetch("https://iam.cloud.ibm.com/identity/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${IBM_API_KEY}`
        });

        const data = await response.json();

        if (data.access_token) {
            res.json({ access_token: data.access_token });
        } else {
            console.error("Resposta IBM:", data);
            res.status(401).json({ error: "Token não retornado", detalhes: data });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro interno" });
    }
});

app.listen(3001, () => console.log("🚀 Token server rodando em http://localhost:3001"));