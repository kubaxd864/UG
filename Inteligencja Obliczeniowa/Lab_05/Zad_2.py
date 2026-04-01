from pathlib import Path
import cv2
import numpy as np


INPUT_DIR = Path("bird_miniatures")
OUTPUT_DIR = Path("zad_2")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

# Zakres powierzchni pojedynczego "ptaka" (ciemnego punktu) w pikselach.
MIN_AREA = 3
MAX_AREA = 140


def iter_images(folder: Path):
	exts = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}
	for path in sorted(folder.iterdir()):
		if path.is_file() and path.suffix.lower() in exts:
			yield path


def build_mask(image_bgr: np.ndarray) -> np.ndarray:
	gray = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2GRAY)
	blur = cv2.GaussianBlur(gray, (3, 3), 0)

	# Otsu automatycznie dobiera prog dla obrazu.
	_, mask = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

	# Usuwa drobny szum i zostawia bardziej zwarte plamki.
	kernel = np.ones((2, 2), np.uint8)
	mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel, iterations=1)
	return mask


def count_dark_points(mask: np.ndarray, min_area: int, max_area: int):
	num_labels, _, stats, centroids = cv2.connectedComponentsWithStats(mask, connectivity=8)
	points = []

	for label in range(1, num_labels):
		area = int(stats[label, cv2.CC_STAT_AREA])
		if min_area <= area <= max_area:
			cx, cy = centroids[label]
			points.append((int(cx), int(cy), area))

	return points


def main():
	if not INPUT_DIR.exists():
		print(f"Folder nie istnieje: {INPUT_DIR}")
		return

	print("Wyniki: nazwa obrazu -> liczba ptakow")

	for image_path in iter_images(INPUT_DIR):
		image = cv2.imread(str(image_path))
		if image is None:
			continue

		mask = build_mask(image)
		points = count_dark_points(mask, MIN_AREA, MAX_AREA)

		# Rysuje punkty na obrazie, aby latwiej sprawdzic wynik.
		annotated = image.copy()
		for x, y, _ in points:
			cv2.circle(annotated, (x, y), 3, (0, 0, 255), 1)

		cv2.imwrite(str(OUTPUT_DIR / f"mask_{image_path.name}"), mask)
		cv2.imwrite(str(OUTPUT_DIR / f"counted_{image_path.name}"), annotated)

		print(f"{image_path.name} -> {len(points)}")


if __name__ == "__main__":
	main()
