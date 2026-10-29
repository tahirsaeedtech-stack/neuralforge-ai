from app.main import app
from fastapi.testclient import TestClient
import os

os.environ["NEURALFORGE_MODE"] = "mock"


client = TestClient(app)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_chat_success():
    response = client.post(
        "/chat",
        json={"message": "How do I troubleshoot DNS?"}
    )

    assert response.status_code == 200

    data = response.json()

    assert data["mode"] == "mock"
    assert data["model"] == "mock-demo"
    assert len(data["response"]) > 0
    assert data["latency_ms"] >= 0


def test_empty_message_rejected():
    response = client.post(
        "/chat",
        json={"message": ""}
    )

    assert response.status_code == 422


def test_missing_message_rejected():
    response = client.post("/chat", json={})

    assert response.status_code == 422
