import math
import matplotlib.pyplot as plt
import numpy as np
from simpful import FuzzySet, FuzzySystem, LinguisticVariable, Triangular_MF


def import_gym():
	try:
		import gymnasium as gym
	except ModuleNotFoundError:
		import gym
	return gym


def safe_reset(env):
	result = env.reset()
	if isinstance(result, tuple):
		return result[0]
	return result


def safe_step(env, action):
	result = env.step(action)
	if len(result) == 5:
		obs, reward, terminated, truncated, info = result
		return obs, reward, terminated or truncated, info
	obs, reward, done, info = result
	return obs, reward, done, info


def build_fuzzy_controller():
	fs = FuzzySystem(show_banner=False)

	angle = LinguisticVariable(
		[
			FuzzySet(function=Triangular_MF(-math.pi, -math.pi, -1.0), term="neg_large"),
			FuzzySet(function=Triangular_MF(-2.0, -0.7, 0.0), term="neg_small"),
			FuzzySet(function=Triangular_MF(-0.3, 0, 0.3), term="zero"),
			FuzzySet(function=Triangular_MF(0.0, 0.7, 2.0), term="pos_small"),
			FuzzySet(function=Triangular_MF(1.0, math.pi, math.pi), term="pos_large"),
		],
		universe_of_discourse=[-math.pi, math.pi],
	)
	ang_vel = LinguisticVariable(
		[
			FuzzySet(function=Triangular_MF(-8, -8, -2.5), term="neg_fast"),
			FuzzySet(function=Triangular_MF(-4, -1, 0), term="neg"),
			FuzzySet(function=Triangular_MF(-0.5, 0, 0.5), term="zero"),
			FuzzySet(function=Triangular_MF(0, 1, 4), term="pos"),
			FuzzySet(function=Triangular_MF(2.5, 8, 8), term="pos_fast"),
		],
		universe_of_discourse=[-8, 8],
	)
	torque = LinguisticVariable(
		[
			FuzzySet(function=Triangular_MF(-2, -2, -1.0), term="neg_strong"),
			FuzzySet(function=Triangular_MF(-1.5, -0.7, 0), term="neg"),
			FuzzySet(function=Triangular_MF(-0.2, 0, 0.2), term="zero"),
			FuzzySet(function=Triangular_MF(0, 0.7, 1.5), term="pos"),
			FuzzySet(function=Triangular_MF(1.0, 2, 2), term="pos_strong"),
		],
		universe_of_discourse=[-2, 2],
	)

	fs.add_linguistic_variable("angle", angle)
	fs.add_linguistic_variable("ang_vel", ang_vel)
	fs.add_linguistic_variable("torque", torque)

	fs.add_rules(
		[
			"IF (angle IS pos_large) THEN (torque IS neg_strong)",
			"IF (angle IS neg_large) THEN (torque IS pos_strong)",
			"IF (angle IS pos_small) AND (ang_vel IS pos_fast) THEN (torque IS neg_strong)",
			"IF (angle IS pos_small) AND (ang_vel IS pos) THEN (torque IS neg)",
			"IF (angle IS pos_small) AND (ang_vel IS zero) THEN (torque IS neg)",
			"IF (angle IS pos_small) AND (ang_vel IS neg) THEN (torque IS zero)",
			"IF (angle IS neg_small) AND (ang_vel IS neg_fast) THEN (torque IS pos_strong)",
			"IF (angle IS neg_small) AND (ang_vel IS neg) THEN (torque IS pos)",
			"IF (angle IS neg_small) AND (ang_vel IS zero) THEN (torque IS pos)",
			"IF (angle IS neg_small) AND (ang_vel IS pos) THEN (torque IS zero)",
			"IF (angle IS zero) AND (ang_vel IS pos_fast) THEN (torque IS neg_strong)",
			"IF (angle IS zero) AND (ang_vel IS pos) THEN (torque IS neg)",
			"IF (angle IS zero) AND (ang_vel IS zero) THEN (torque IS zero)",
			"IF (angle IS zero) AND (ang_vel IS neg) THEN (torque IS pos)",
			"IF (angle IS zero) AND (ang_vel IS neg_fast) THEN (torque IS pos_strong)",
		]
	)
	if hasattr(fs, "set_defuzzification_method"):
		fs.set_defuzzification_method("torque", "COG")
	return fs


def plot_variables(fs):
	fs.plot_variable("angle")
	fs.plot_variable("ang_vel")
	fs.plot_variable("torque")
	plt.show()


def run_controller():
	gym = import_gym()
	env = gym.make("Pendulum-v1", render_mode="human")
	fs = build_fuzzy_controller()

	plot_variables(fs)

	obs = safe_reset(env)
	total_reward = 0.0

	max_steps = 200
	if getattr(env, "spec", None) is not None and env.spec.max_episode_steps:
		max_steps = env.spec.max_episode_steps
	for step in range(max_steps):
		cos_theta, sin_theta, theta_dot = obs
		theta = math.atan2(sin_theta, cos_theta)

		fs.set_variable("angle", theta)
		fs.set_variable("ang_vel", theta_dot)
		output = fs.inference()
		torque = float(output["torque"])
		torque = float(np.clip(torque, -2.0, 2.0))

		obs, reward, done, _ = safe_step(env, [torque])
		total_reward += float(reward)
		if done:
			break

	env.close()
	print("Total reward:", total_reward)


if __name__ == "__main__":
	run_controller()
