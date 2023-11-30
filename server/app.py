import cv2
from flask import Flask, jsonify, render_template
from flask_socketio import SocketIO, emit
from ultralytics import YOLO
from flask_cors import CORS

def crop_and_process_image(img_path, output_path, model, crop_coordinates, confidence=0.2):
    img = cv2.imread(img_path)

    # the crop coordinates
    x, y, w, h = crop_coordinates

    crop_img = img[y:y + h, x:x + w]
    cv2.imwrite(output_path, crop_img)

    # Run model on the cropped image
    results = model(source=output_path, conf=confidence, save=True)
    number_cars = 0

    # loop to get # of cars in cars.txt

    for result in results:
        boxes = result.boxes.cpu().numpy()
        for box in boxes:
            if (result.names[int(box.cls[0])] == 'car') or (result.names[int(box.cls[0])] == 'truck'):
                number_cars += 1

    return number_cars

    # add # of cars to the cars.txt

    with open("cars.txt", "wt") as file:
        file.write(str(number_cars))

    with open("cars.txt", "rt") as file:
        file_content = file.read()

app = Flask(__name__)
CORS(app)

@app.route("/")
def process_image():
    try:
        # Load a YOLO model
        model = YOLO('yolov8n.pt')
        # Cropping coordinates for image 1
        crop_coordinates_image1 = (0, 1340, 1544, 800)
        number_cars_image1 = crop_and_process_image("source/northTOeast0.png", "source/crop_images/image1.png", model, crop_coordinates_image1)

        # Cropping coordinates for image 2
        crop_coordinates_image2 = (2050, 1340, 1240, 450)
        number_cars_image2 = crop_and_process_image("source/northTOeast0.png", "source/crop_images/image2.png", model, crop_coordinates_image2)

        #Cropping coordinates for image 3
        crop_coordinates_image3 = (0, 640, 600, 400)
        number_cars_image3 = crop_and_process_image("source/northTOwest0.png", "source/crop_images/image3.png", model, crop_coordinates_image3)
        #Cropping coordinates for image 4
        crop_coordinates_image4 = (1020, 630, 1000, 900)
        number_cars_image4 = crop_and_process_image("source/northTOwest0.png", "source/crop_images/image4.png", model, crop_coordinates_image4)


        # Sum the number of cars from both images
        total_number_cars = number_cars_image1 + number_cars_image2 + number_cars_image3 + number_cars_image4

        with open("cars.txt", "wt") as file:
            file.write(str(total_number_cars))

        #send total number of cars to the frontend 

        return jsonify({'total_cars': total_number_cars})

        # Write the total number of cars to the file
        

    except Exception as e:
        # Return an error message as JSON response
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=False)
