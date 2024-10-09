import pygame
import random
import time

# Khởi tạo pygame
pygame.init()

# Màu sắc
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (213, 50, 80)
GREEN = (0, 255, 0)

# Kích thước màn hình
SCREEN_WIDTH = 600
SCREEN_HEIGHT = 400

# Kích thước ô vuông con rắn
BLOCK_SIZE = 20

# Tốc độ di chuyển của con rắn
SNAKE_SPEED = 15

# Thiết lập màn hình
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Trò chơi con rắn")

# Đồng hồ để kiểm soát tốc độ khung hình
clock = pygame.time.Clock()

# Font để hiển thị điểm số
font = pygame.font.SysFont("bahnschrift", 25)

# Hiển thị điểm số
def display_score(score):
    value = font.render("Điểm: " + str(score), True, WHITE)
    screen.blit(value, [0, 0])

# Hàm tạo hình con rắn
def draw_snake(snake_body):
    for block in snake_body:
        pygame.draw.rect(screen, GREEN, [block[0], block[1], BLOCK_SIZE, BLOCK_SIZE])

# Tạo vị trí ngẫu nhiên cho quả táo
def generate_apple():
    return [
        random.randrange(0, SCREEN_WIDTH // BLOCK_SIZE) * BLOCK_SIZE,
        random.randrange(0, SCREEN_HEIGHT // BLOCK_SIZE) * BLOCK_SIZE
    ]

# Game loop
def game_loop():
    game_over = False
    game_close = False

    # Vị trí ban đầu của con rắn
    snake_x = SCREEN_WIDTH // 2
    snake_y = SCREEN_HEIGHT // 2
    snake_body = [[snake_x, snake_y]]
    snake_length = 1

    # Vị trí ban đầu của quả táo
    apple_x, apple_y = generate_apple()

    # Hướng di chuyển ban đầu của con rắn
    dx = 0
    dy = 0

    score = 0

    while not game_over:

        # Khi trò chơi kết thúc
        while game_close:
            screen.fill(BLACK)
            message = font.render("Trò chơi kết
