import os
import numpy as np
import matplotlib.pyplot as plt

TARGET_DIR = r"D:\01_Work_Projects\Portfolio\sangtran-portfolio-website\public\images\shaderlex"
BG_COLOR = "#0b0f19" # Match the website card background
GRID_COLOR = "#1f2937"
TEXT_COLOR = "#f3f4f6"
CYAN = "#14b8a6"
ORANGE = "#f97316"
PURPLE = "#a855f7"

def setup_plot_style(ax, title):
    ax.set_facecolor(BG_COLOR)
    ax.spines['bottom'].set_color(GRID_COLOR)
    ax.spines['top'].set_color(GRID_COLOR)
    ax.spines['left'].set_color(GRID_COLOR)
    ax.spines['right'].set_color(GRID_COLOR)
    ax.tick_params(colors=TEXT_COLOR, which='both')
    ax.grid(True, color=GRID_COLOR, linestyle='--')
    ax.set_title(title, color=TEXT_COLOR, fontsize=14, pad=15)

# --- 1. Vector Dot Product Diagram (math_dot_diagram1.png & math_dot_thumb.png) ---
fig, ax = plt.subplots(figsize=(8, 6), facecolor=BG_COLOR)
setup_plot_style(ax, "Vector Dot Product: A . B = cos(theta)")

# Draw vectors
ax.quiver(0, 0, 1, 0, angles='xy', scale_units='xy', scale=1, color=CYAN, width=0.015, label="Vector A (Normalized)")
ax.quiver(0, 0, 0.7, 0.7, angles='xy', scale_units='xy', scale=1, color=ORANGE, width=0.015, label="Vector B (Normalized)")

# Draw theta arc
theta = np.linspace(0, np.pi/4, 50)
r = 0.25
ax.plot(r*np.cos(theta), r*np.sin(theta), color=TEXT_COLOR, linestyle=':')
ax.text(0.28, 0.12, "theta", color=TEXT_COLOR, fontsize=12)

# Text labels for vectors
ax.text(0.5, -0.08, "Vector A", color=CYAN, fontsize=12, fontweight='bold')
ax.text(0.35, 0.45, "Vector B", color=ORANGE, fontsize=12, fontweight='bold')

# Projection line
ax.plot([0.7, 0.7], [0.7, 0], color=TEXT_COLOR, linestyle='--')
ax.text(0.72, 0.3, "Projection\n(A . B)", color=TEXT_COLOR, fontsize=10)

ax.set_xlim(-0.2, 1.2)
ax.set_ylim(-0.2, 1.2)
ax.set_aspect('equal')
plt.legend(facecolor=BG_COLOR, edgecolor=GRID_COLOR, labelcolor=TEXT_COLOR, loc="upper left")
plt.tight_layout()
fig.savefig(os.path.join(TARGET_DIR, "math_dot_diagram1.png"), dpi=100, facecolor=BG_COLOR)
fig.savefig(os.path.join(TARGET_DIR, "math_dot_thumb.png"), dpi=100, facecolor=BG_COLOR)
plt.close(fig)

# --- 2. Cosine Angle Thresholds (math_dot_diagram2.png) ---
fig, ax = plt.subplots(figsize=(8, 6), facecolor=BG_COLOR)
setup_plot_style(ax, "Dot Product Outputs based on Angle")

x = np.linspace(0, np.pi, 200)
y = np.cos(x)
ax.plot(x * 180 / np.pi, y, color=CYAN, linewidth=3, label="cos(theta)")

# Highlight specific points
ax.scatter([0, 90, 180], [1, 0, -1], color=ORANGE, s=100, zorder=5)
ax.text(5, 0.85, "0 deg (Parallel)\nDot = 1.0", color=TEXT_COLOR, fontsize=10)
ax.text(95, 0.1, "90 deg (Perpendicular)\nDot = 0.0", color=TEXT_COLOR, fontsize=10)
ax.text(125, -0.85, "180 deg (Opposite)\nDot = -1.0", color=TEXT_COLOR, fontsize=10)

ax.set_xlabel("Angle in Degrees (theta)", color=TEXT_COLOR, fontsize=12)
ax.set_ylabel("Dot Product Value", color=TEXT_COLOR, fontsize=12)
ax.set_xlim(-10, 190)
ax.set_ylim(-1.2, 1.2)
plt.tight_layout()
fig.savefig(os.path.join(TARGET_DIR, "math_dot_diagram2.png"), dpi=100, facecolor=BG_COLOR)
plt.close(fig)

# --- 3. Step vs Smoothstep (math_funcs_diagram1.png & math_funcs_thumb.png) ---
fig, ax = plt.subplots(figsize=(8, 6), facecolor=BG_COLOR)
setup_plot_style(ax, "Thresholds: Step vs Smoothstep")

x = np.linspace(0, 1, 200)
# Step function
y_step = np.where(x >= 0.5, 1.0, 0.0)
# Smoothstep function
y_smooth = np.where(x < 0.2, 0.0, np.where(x > 0.8, 1.0, 3*((x-0.2)/0.6)**2 - 2*((x-0.2)/0.6)**3))

ax.plot(x, y_step, color=ORANGE, linewidth=3, label="Step (Edge = 0.5)")
ax.plot(x, y_smooth, color=CYAN, linewidth=3, label="Smoothstep (Min=0.2, Max=0.8)")

ax.set_xlabel("Input Value (X)", color=TEXT_COLOR, fontsize=12)
ax.set_ylabel("Output Value", color=TEXT_COLOR, fontsize=12)
ax.set_xlim(-0.05, 1.05)
ax.set_ylim(-0.1, 1.1)
plt.legend(facecolor=BG_COLOR, edgecolor=GRID_COLOR, labelcolor=TEXT_COLOR, loc="upper left")
plt.tight_layout()
fig.savefig(os.path.join(TARGET_DIR, "math_funcs_diagram1.png"), dpi=100, facecolor=BG_COLOR)
fig.savefig(os.path.join(TARGET_DIR, "math_funcs_thumb.png"), dpi=100, facecolor=BG_COLOR)
plt.close(fig)

# --- 4. Fract vs Floor (math_funcs_diagram2.png) ---
fig, ax = plt.subplots(figsize=(8, 6), facecolor=BG_COLOR)
setup_plot_style(ax, "Tiling & Stepping: Fract vs Floor")

x = np.linspace(0, 3, 300)
y_fract = x - np.floor(x)
y_floor = np.floor(x)

# Plot Fract (with discontinuities to look correct)
for i in range(3):
    xs = x[(x >= i) & (x < i+1)]
    ys = xs - i
    if i == 0:
        ax.plot(xs, ys, color=CYAN, linewidth=3, label="Fract (Tiling)")
    else:
        ax.plot(xs, ys, color=CYAN, linewidth=3)

# Plot Floor (step plot)
ax.step(x, y_floor, where='post', color=ORANGE, linewidth=3, label="Floor (Pixelation/Bands)")

ax.set_xlabel("Input Value (X)", color=TEXT_COLOR, fontsize=12)
ax.set_ylabel("Output Value", color=TEXT_COLOR, fontsize=12)
ax.set_xlim(-0.1, 3.1)
ax.set_ylim(-0.2, 3.2)
plt.legend(facecolor=BG_COLOR, edgecolor=GRID_COLOR, labelcolor=TEXT_COLOR, loc="upper left")
plt.tight_layout()
fig.savefig(os.path.join(TARGET_DIR, "math_funcs_diagram2.png"), dpi=100, facecolor=BG_COLOR)
plt.close(fig)

print("All math plots generated successfully!")
