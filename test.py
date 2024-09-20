import torch
from torchvision.ops import nms

boxes = torch.tensor([[10, 10, 20, 20], [15, 15, 25, 25]], dtype=torch.float32)
scores = torch.tensor([0.9, 0.8], dtype=torch.float32)
iou_threshold = 0.5

keep = nms(boxes, scores, iou_threshold)
print(keep)
