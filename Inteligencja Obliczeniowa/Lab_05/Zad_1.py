from ultralytics import YOLO
import json
from pathlib import Path
import cv2

model = YOLO("yolo26n.pt")
output_dir = Path("zad_1")
output_dir.mkdir(parents=True, exist_ok=True)
mode = "video" 

if mode == "file":
    file_name = "office_yolo.png"

    train_results = model.train(
        data="coco8.yaml",  
        epochs=10,
        imgsz=640, 
        device="cpu",
    )

    metrics = model.val()
    results = model(file_name, conf=0.5)  
    results[0].show()

    for i, result in enumerate(results):
        result.save(filename=str(output_dir / f'analyzed_{file_name}_{i}.jpg'))

    wyniki = []

    for result in results:
        for box in result.boxes:
            wynik = {
                'klasa': model.names[int(box.cls[0])],
                'id_klasy': int(box.cls[0]),
                'pewnosc': float(box.conf[0]),
                'bounding_box': {
                    'x1': float(box.xyxy[0][0]),
                    'y1': float(box.xyxy[0][1]),
                    'x2': float(box.xyxy[0][2]),
                    'y2': float(box.xyxy[0][3])
                }
            }
            wyniki.append(wynik)

    with open(output_dir / 'wyniki.json', 'w', encoding='utf-8') as f:
        json.dump(wyniki, f, indent=4, ensure_ascii=False)

elif mode == "video":
    video_path = Path("office_yolo.mp4")

    if video_path.exists():
        video_frames_dir = output_dir / "video_frames"
        video_frames_dir.mkdir(parents=True, exist_ok=True)

        wyniki_video = []

        for frame_idx, result in enumerate(model.predict(source=str(video_path), conf=0.5, stream=True, device="cpu")):
            annotated_frame = result.plot()
            frame_out = video_frames_dir / f"frame_{frame_idx:05d}.jpg"
            cv2.imwrite(str(frame_out), annotated_frame)

            for box in result.boxes:
                wynik = {
                    'frame': frame_idx,
                    'klasa': model.names[int(box.cls[0])],
                    'id_klasy': int(box.cls[0]),
                    'pewnosc': float(box.conf[0]),
                    'bounding_box': {
                        'x1': float(box.xyxy[0][0]),
                        'y1': float(box.xyxy[0][1]),
                        'x2': float(box.xyxy[0][2]),
                        'y2': float(box.xyxy[0][3])
                    }
                }
                wyniki_video.append(wynik)

        with open(output_dir / 'wyniki_video.json', 'w', encoding='utf-8') as f:
            json.dump(wyniki_video, f, indent=4, ensure_ascii=False)
    else:
        print(f"Nie znaleziono pliku wideo: {video_path}")

