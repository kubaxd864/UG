import random
from dataclasses import dataclass
from typing import Callable, Optional

import numpy as np


def import_gym():
    try:
        import gymnasium as gym
    except ModuleNotFoundError:
        try:
            import gym
        except ModuleNotFoundError as exc:
            raise ModuleNotFoundError(
                "Install gymnasium to run the extra environments."
            ) from exc
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


def policy_cartpole(env, state):
    # Hand-crafted action set (0 = left, 1 = right) to keep pole upright.
    pole_angle = state[2]
    return 1 if pole_angle > 0 else 0


def policy_taxi(env, state):
    # Hand-crafted action set with pickup/drop-off decisions for Taxi.
    taxi_row, taxi_col, pass_loc, dest_idx = env.unwrapped.decode(state)
    locations = [(0, 0), (0, 4), (4, 0), (4, 3)]

    if pass_loc < 4:
        target_row, target_col = locations[pass_loc]
        if (taxi_row, taxi_col) == (target_row, target_col):
            return 4
    else:
        target_row, target_col = locations[dest_idx]
        if (taxi_row, taxi_col) == (target_row, target_col):
            return 5

    best_action = None
    best_dist = 10**9
    for action in range(4):
        transitions = env.unwrapped.P[state][action]
        next_state = transitions[0][1]
        next_row, next_col, _, _ = env.unwrapped.decode(next_state)
        dist = abs(next_row - target_row) + abs(next_col - target_col)
        if dist < best_dist:
            best_dist = dist
            best_action = action

    if best_action is None:
        return env.action_space.sample()
    return best_action


@dataclass
class EnvSpec:
    name: str
    category: str
    episodes: int = 1
    max_steps: int = 200
    policy: Optional[Callable] = None


ENV_SPECS = [
    # Stan: ciągły, Akcje: dyskretne
    EnvSpec(
        name="CartPole-v1",
        category="Classic Control",
        episodes=2,
        max_steps=500,
        policy=policy_cartpole,
    ),
    # Stan: dyskretny, Akcje: dyskretne
    EnvSpec(
        name="Taxi-v4",
        category="ToyText",
        episodes=2,
        max_steps=200,
        policy=policy_taxi,
    ),
    # Stan: ciągły, Akcje: ciągły
    EnvSpec(
        name="HalfCheetah-v5",
        category="MuJoCo",
        episodes=1,
        max_steps=200,
    ),
    # Stan: ciągły, Akcje: ciągły
    EnvSpec(
        name="BipedalWalker-v3",
        category="Box2D",
        episodes=1,
        max_steps=200,
    ),
]


def run_env(gym, spec: EnvSpec):
    print(f"\n[{spec.category}] {spec.name}")
    try:
        env = gym.make(spec.name, render_mode="human")
    except Exception as exc:
        print(f"  Could not create env: {exc}")
        return

    try:
        for episode in range(spec.episodes):
            obs = safe_reset(env)
            total_reward = 0.0

            for _ in range(spec.max_steps):
                if spec.policy is not None:
                    action = spec.policy(env, obs)
                else:
                    action = env.action_space.sample()

                obs, reward, done, _ = safe_step(env, action)
                total_reward += float(reward)
                env.render()

                if done:
                    break

            print(f"  Episode {episode + 1}/{spec.episodes} reward: {total_reward:.2f}")
    finally:
        env.close()


if __name__ == "__main__":
    gym = import_gym()
    random.seed(0)
    np.random.seed(0)

    for spec in ENV_SPECS:
        run_env(gym, spec)
