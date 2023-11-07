from flask import Flask, jsonify
import cv2
from ultralytics import YOLO

# Opens a image in RGB mode
def crop_image():
    img = cv2.imread("source/northTOeast0.png")

    # Define the coordinates and dimensions for cropping
    x = 1730  # X-coordinate of the top-left corner
    y = 1730  # Y-coordinate of the top-left corner
    w = 1741  # Width of the cropped region
    h = 1200  # Height of the cropped region

    crop_img = img[y:y + h, x:x + w]
    save_path = "source/crop_images/image1.png"
    cv2.imwrite(save_path, crop_img)


app = Flask(__name__)

@app.route('/api/process_image', methods=['GET'])
def process_image():
    try:
        # Load a pretrained YOLO model (recommended for training)
        model = YOLO('yolov8n.pt')
        crop_image()
        results = model(source="source/crop_images/image1.png", conf=0.3, save=True)

        log = results[0].tojson()

        with open("cars.txt", "wt") as file:
            file.write(str(log))

        with open("cars.txt", "rt") as file:
            file_content = file.read()

        return jsonify({'message': file_content})


    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=False)