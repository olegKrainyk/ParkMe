""" from PIL import Image
from ultralytics import YOLO


# Load a pretrained YOLO model (recommended for training)
model = YOLO('yolov8n.pt')
results = model(source="source/northTOeast0.png", conf=0.3, save=True)

file_path = "cars.txt"

log = results[0].tojson()

with open(file_path, "wt") as file:
    file.write(str(log)) """

from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/process_image', methods=['GET'])
def process_image():
    try:
        from PIL import Image
        from ultralytics import YOLO

        # Load a pretrained YOLO model (recommended for training)
        model = YOLO('yolov8n.pt')
        results = model(source="source/northTOeast0.png", conf=0.3, save=True)

        log = results[0].tojson()

        with open("cars.txt", "wt") as file:
            file.write(str(log))

        with open("cars.txt", "rt") as file:
            file_content = file.read()

        return jsonify({'message': file_content})


    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)