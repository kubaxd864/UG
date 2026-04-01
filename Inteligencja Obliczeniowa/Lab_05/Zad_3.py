from ultralytics import YOLO
import json
from pathlib import Path
import cv2
import numpy as np

model = YOLO("yolo26n.pt")
output_dir = Path("zad_3")
output_dir.mkdir(parents=True, exist_ok=True)

input_dir = Path("bird_miniatures")

def preprocess_pictures(image_bgr):
    lab = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    l = clahe.apply(l)
    enhanced = cv2.cvtColor(cv2.merge((l, a, b)), cv2.COLOR_LAB2BGR)
    sharpen_kernel = np.array([[0, -1, 0], [-1, 5, -1], [0, -1, 0]], dtype=np.float32)
    enhanced = cv2.filter2D(enhanced, -1, sharpen_kernel)
    upscaled = cv2.resize(enhanced, None, fx=6, fy=6, interpolation=cv2.INTER_CUBIC)
    return upscaled

if input_dir.exists():
    image_ext = {".jpg", ".png"}
    image_files = [p for p in sorted(input_dir.iterdir()) if p.is_file() and p.suffix.lower() in image_ext]
    all_results = []
    summary = []

    for image_path in image_files:
        image = cv2.imread(str(image_path))
        if image is None:
            continue
        processed = preprocess_pictures(image)

        results = model.predict(
        source=processed,
        conf=0.005,
        iou=0.45,
        imgsz=1600,
        max_det=1000,
        device="cpu",
        verbose=False,
    )

        detections_in_image = 0
        for i, result in enumerate(results):
            annotated = result.plot()
            cv2.imwrite(str(output_dir / f"analyzed_{image_path.stem}_{i}.jpg"), annotated)

            if result.boxes is None or len(result.boxes) == 0:
                continue

            xyxy = result.boxes.xyxy.cpu().numpy()
            confs = result.boxes.conf.cpu().numpy()
            clss = result.boxes.cls.cpu().numpy().astype(int)

            for box, conf, cls_id in zip(xyxy, confs, clss):
                x1, y1, x2, y2 = box.tolist()
                detections_in_image += 1
                all_results.append({
                    'plik': image_path.name,
                    'klasa': model.names.get(int(cls_id), str(int(cls_id))),
                    'id_klasy': int(cls_id),
                    'pewnosc': float(conf),
                    'bounding_box': {
                        'x1': float(x1),
                        'y1': float(y1),
                        'x2': float(x2),
                        'y2': float(y2),
                    }
                })

        summary.append({
            'plik': image_path.name,
            'liczba_detekcji': detections_in_image,
        })

    with open(output_dir / 'wyniki.json', 'w', encoding='utf-8') as f:
        json.dump(all_results, f, indent=4, ensure_ascii=False)

    with open(output_dir / 'podsumowanie.json', 'w', encoding='utf-8') as f:
        json.dump(summary, f, indent=4, ensure_ascii=False)
else:
    print(f"Folder wejściowy nie istnieje: {input_dir}")