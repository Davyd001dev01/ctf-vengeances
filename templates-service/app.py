from flask import Flask, request, Response
from jinja2 import Template
import os

app = Flask(__name__)
REQ_HDR = "X-Internal-Token"
REQ_VAL = os.environ.get("INTERNAL_FETCH_TOKEN", "import-service")

@app.get("/healthz")
def healthz():
    return {"ok": True}

def guard(req):
    return req.headers.get(REQ_HDR) == REQ_VAL

@app.post("/render")
def render():
    if not guard(request):
        return Response("forbidden", status=403)
    data = request.get_json(silent=True) or {}
    tpl = data.get("tpl", "")
    ctx = data.get("ctx", {}) or {}
    try:
        out = Template(tpl).render(**ctx)
        return Response(out, mimetype="text/plain")
    except Exception as e:
        return Response(str(e), status=400, mimetype="text/plain")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
