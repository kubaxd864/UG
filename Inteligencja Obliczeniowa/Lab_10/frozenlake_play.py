from pathlib import Path

import gymnasium as gym
import numpy as np


ENV_NAME = "FrozenLake-v1"
MAP_NAME = "4x4"
IS_SLIPPERY = True
MAX_STEPS = 100
PLAY_EPISODES = 5
Q_TABLE_PATH = Path(__file__).with_name("frozenlake_q_table.npy")


def make_env():
    try:
        return gym.make(
            ENV_NAME,
            map_name=MAP_NAME,
            is_slippery=IS_SLIPPERY,
            render_mode="human",
        )
    except TypeError:
        return gym.make(ENV_NAME, map_name=MAP_NAME, is_slippery=IS_SLIPPERY)


def load_q_table():
    if not Q_TABLE_PATH.exists():
        raise FileNotFoundError(
            f"{Q_TABLE_PATH} was not found. Save the Q-table from frozenlake-q-learn.py."
        )
    return np.load(Q_TABLE_PATH)


def play_episode(env, q_table):
    state, _ = env.reset()
    total_reward = 0.0

    for _ in range(MAX_STEPS):
        if not hasattr(env, "render_mode"):
            env.render()

        action = int(np.argmax(q_table[state]))
        state, reward, terminated, truncated, _ = env.step(action)
        total_reward += reward

        if terminated or truncated:
            break

    return total_reward


if __name__ == "__main__":
    env = make_env()
    q_table = load_q_table()

    for episode in range(PLAY_EPISODES):
        score = play_episode(env, q_table)
        print(f"Episode {episode + 1}/{PLAY_EPISODES}, Score: {score:.2f}")

    env.close()
