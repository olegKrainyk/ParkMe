from flask import Flask, jsonify
from PIL import Image
from ultralytics import YOLO
# Load a pretrained YOLO model (recommended for training)
model = YOLO('yolov8n.pt')


app = Flask(__name__)

@app.route('/api/process_image', methods=['GET'])
def process_image():
    try:

        numberCars = 0;
        results = model(source="source/northTOeast0.png", conf=0.3, save=True)

        for result in results:
            boxes = result.boxes.cpu().numpy()
            for box in boxes:
                if (result.names[int(box.cls[0])] == 'car') or (result.names[int(box.cls[0])] == 'truck'):
                    numberCars += 1

        with open("cars.txt", "wt") as file:
            file.write(str(numberCars))

        with open("cars.txt", "rt") as file:
            file_content = file.read()

        return jsonify({'message': file_content})


    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=False)