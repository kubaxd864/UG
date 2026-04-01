import math


def sigmoid(x: float) -> float:
	return 1.0 / (1.0 + math.exp(-x))


def forward(x1: float, x2: float, params: dict[str, float]) -> dict[str, float]:
	z1 = x1 * params["w1"] + x2 * params["w3"] + params["b1"]
	z2 = x1 * params["w2"] + x2 * params["w4"] + params["b2"]

	h1 = sigmoid(z1)
	h2 = sigmoid(z2)

	y_hat = h1 * params["w5"] + h2 * params["w6"] + params["b3"]

	return {
		"z1": z1,
		"z2": z2,
		"h1": h1,
		"h2": h2,
		"y_hat": y_hat,
	}


def mse_half(y_true: float, y_hat: float) -> float:
	return 0.5 * (y_true - y_hat) ** 2


def backward_and_update(
	x1: float,
	x2: float,
	y_true: float,
	params: dict[str, float],
	lr: float,
) -> tuple[dict[str, float], dict[str, float], float]:
	values = forward(x1, x2, params)
	h1 = values["h1"]
	h2 = values["h2"]
	
	y_hat = values["y_hat"]
	dL_dy = y_hat - y_true
	
	d_w5 = dL_dy * h1
	d_w6 = dL_dy * h2
	d_b3 = dL_dy
	
	dL_dz1 = dL_dy * params["w5"] * h1 * (1.0 - h1)
	dL_dz2 = dL_dy * params["w6"] * h2 * (1.0 - h2)

	d_w1 = dL_dz1 * x1
	d_w3 = dL_dz1 * x2
	d_b1 = dL_dz1

	d_w2 = dL_dz2 * x1
	d_w4 = dL_dz2 * x2
	d_b2 = dL_dz2

	grads = {
		"w1": d_w1,
		"w2": d_w2,
		"w3": d_w3,
		"w4": d_w4,
		"w5": d_w5,
		"w6": d_w6,
		"b1": d_b1,
		"b2": d_b2,
		"b3": d_b3,
	}

	new_params = params.copy()
	for key in new_params:
		new_params[key] = new_params[key] - lr * grads[key]

	loss = mse_half(y_true, y_hat)
	return grads, new_params, loss


def main() -> None:
	params = {
		"w1": 0.2,
		"w2": -0.3,
		"w3": -0.3,
		"w4": 0.1,
		"w5": 0.3,
		"w6": -0.4,
		"b1": 0.4,
		"b2": -0.2,
		"b3": 0.2,
	}

	x1 = 0.6
	x2 = 0.1

	y_true = 0.5
	lr = 0.1

	print("=== Pierwsze obliczenie ===")
	values = forward(x1, x2, params)
	print(f"x1 = {x1}, x2 = {x2}")
	print(f"y_hat = {values['y_hat']:.6f}")
	
	loss = mse_half(y_true, values["y_hat"])
	print(f"L = {loss:.6f}")
	_, new_params, _ = backward_and_update(x1, x2, y_true, params, lr)

	print("\n=== Dane po aktualizacji uczącej model ===")
	values_after = forward(x1, x2, new_params)
	loss_after = mse_half(y_true, values_after["y_hat"])
	print(f"x1 = {x1}, x2 = {x2}")
	print(f"y_hat po aktualizacji = {values_after['y_hat']:.6f}")
	print(f"L po aktualizacji     = {loss_after:.6f}")

if __name__ == "__main__":
	main()
