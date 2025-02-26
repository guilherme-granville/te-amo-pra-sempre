import os
import sys
from PIL import Image

input_folder = 'D:\\USUARIO\\Desktop\\ana-main\\img'
output_folder = 'D:\\USUARIO\\Desktop\\ana-main\\img\\webp'

def jpg_to_webp(input_folder, output_folder):
    for filename in os.listdir(input_folder):
        if filename.endswith(".jpg"):
            img = Image.open(os.path.join(input_folder, filename))
            rgb_img = img.convert('RGB')
            rgb_img.save(os.path.join(output_folder, filename.split('.')[0] + '.webp'), 'webp')

if __name__ == "__main__":
    jpg_to_webp(input_folder, output_folder)

