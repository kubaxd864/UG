import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import matplotlib.pyplot as plt
from torch.utils.data import DataLoader, TensorDataset, random_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import confusion_matrix, accuracy_score


SEED = 302410
EPOCHS = 40
torch.manual_seed(SEED)
np.random.seed(SEED)


class IrisNet(nn.Module):
    # Składowe modelu:
    # 3 wejścia -> 16 neuronów -> ReLU -> 8 neuronów -> ReLU -> 2 wyjścia
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(3, 16),
            nn.ReLU(),
            nn.Linear(16, 8),
            nn.ReLU(),
            nn.Linear(8, 2)
        )

    def forward(self, x):
        return self.net(x)


def evaluate(model, dataloader, criterion, device):
    model.eval()
    total_loss = 0.0
    all_preds = []
    all_targets = []

    with torch.no_grad():
        for xb, yb in dataloader:
            xb, yb = xb.to(device), yb.to(device)
            logits = model(xb)
            loss = criterion(logits, yb)
            total_loss += loss.item() * xb.size(0)

            preds = torch.argmax(logits, dim=1)
            all_preds.extend(preds.cpu().numpy())
            all_targets.extend(yb.cpu().numpy())

    avg_loss = total_loss / len(dataloader.dataset)
    acc = accuracy_score(all_targets, all_preds)
    return avg_loss, acc, np.array(all_targets), np.array(all_preds)


def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Device: {device}")

    df = pd.read_csv("diagnosis.csv")
    X_np = df.iloc[:, :-1].values.astype(np.float32)
    y_np = df.iloc[:, -1].values.astype(np.int64)
    class_names = {"chory", "zdrowy"}

    scaler = StandardScaler()
    X_np = scaler.fit_transform(X_np).astype(np.float32)
    
    X = torch.tensor(X_np, dtype=torch.float32)
    y = torch.tensor(y_np, dtype=torch.long)

    dataset = TensorDataset(X, y)
    train_size = int(0.8 * len(dataset))
    val_size = len(dataset) - train_size
    train_data, val_data = random_split(
        dataset,
        [train_size, val_size],
        generator=torch.Generator().manual_seed(SEED)
    )

    train_loader = DataLoader(train_data, batch_size=64, shuffle=True)
    val_loader = DataLoader(val_data, batch_size=64, shuffle=False)

    model = IrisNet().to(device)
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

    train_losses, val_losses = [], []
    train_accs, val_accs = [], []
    for epoch in range(1, EPOCHS + 1):
        model.train()
        running_loss = 0.0
        correct = 0
        total = 0

        for xb, yb in train_loader:
            xb, yb = xb.to(device), yb.to(device)
            optimizer.zero_grad()
            logits = model(xb)
            loss = criterion(logits, yb)
            loss.backward()
            optimizer.step()

            running_loss += loss.item() * xb.size(0)
            preds = torch.argmax(logits, dim=1)
            correct += (preds == yb).sum().item()
            total += yb.size(0)

        train_loss = running_loss / len(train_loader.dataset)
        train_acc = correct / total

        val_loss, val_acc, _, _ = evaluate(model, val_loader, criterion, device)

        train_losses.append(train_loss)
        val_losses.append(val_loss)
        train_accs.append(train_acc)
        val_accs.append(val_acc)

    epochs = np.arange(1, EPOCHS + 1)
    fig, axes = plt.subplots(1, 2, figsize=(14, 4))

    axes[0].plot(epochs, train_losses, label="train loss")
    axes[0].plot(epochs, val_losses, label="val loss")
    axes[0].set_xlabel("Epoch")
    axes[0].set_ylabel("Loss")
    axes[0].set_title("Wykres błędnych predykcji podczas uczenia")
    axes[0].legend()

    axes[1].plot(epochs, train_accs, label="train acc")
    axes[1].plot(epochs, val_accs, label="val acc")
    axes[1].set_xlabel("Epoch")
    axes[1].set_ylabel("Accuracy")
    axes[1].set_title("Wykres trafnych predykcji podczas uczenia")
    axes[1].legend()

    plt.tight_layout()
    plt.show()

    val_loss, val_acc, y_true, y_pred = evaluate(model, val_loader, criterion, device)
    cm = confusion_matrix(y_true, y_pred, labels=[0, 1])
    print("\n=== Wyniki końcowe  ===")
    print(f"Loss: {val_loss:.4f}")
    print(f"Accuracy: {val_acc * 100:.2f}%")
    print("\nMacierz błędu:")
    print(pd.DataFrame(
        cm,
        index=[f"true_{name}" for name in class_names],
        columns=[f"pred_{name}" for name in class_names]
    ))

if __name__ == "__main__":
    main()