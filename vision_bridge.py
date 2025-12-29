from flask import Flask, request, jsonify
from flask_cors import CORS
import random # To simulate different data for each slide

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/analyze', methods=['POST'])
def analyze():
    print("\n[!] BATCH PROCESSING STARTING...")
    files = request.files.getlist('files')
    
    if not files:
        return jsonify({"error": "No files uploaded"}), 400
    
    # We are creating a list of "Objects" for each slide
    structured_data = []
    for file in files:
        print(f"[+] Analyzing: {file.filename}")
        # Simulating AI analysis of the allocation
        match_rate = random.randint(85, 100)
        status = "✅ Verified" if match_rate > 90 else "⚠️ Review Required"
        
        structured_data.append({
            "filename": file.filename,
            "status": status,
            "match": f"{match_rate}%"
        })
    
    return jsonify({"results": structured_data})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)