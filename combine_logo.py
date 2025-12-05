from PIL import Image

# Load the two images
text_img = Image.open(r'C:\Users\tehre\.gemini\antigravity\brain\bb8b3c49-356f-4618-8779-f0864426c727\uploaded_image_2_1764396120423.png')
smile_img = Image.open(r'C:\Users\tehre\.gemini\antigravity\brain\bb8b3c49-356f-4618-8779-f0864426c727\uploaded_image_1_1764396120423.png')

# Get dimensions
text_width, text_height = text_img.size
smile_width, smile_height = smile_img.size

# Calculate the size of the combined image
# We want the smile to be positioned below the text
combined_width = max(text_width, smile_width)
combined_height = text_height + smile_height + 5  # 5px spacing between text and smile

# Create a new image with transparency
combined = Image.new('RGBA', (combined_width, combined_height), (255, 255, 255, 0))

# Calculate positions to center both images horizontally
text_x = (combined_width - text_width) // 2
smile_x = (combined_width - smile_width) // 2

# Paste the text at the top
combined.paste(text_img, (text_x, 0), text_img if text_img.mode == 'RGBA' else None)

# Paste the smile below the text
combined.paste(smile_img, (smile_x, text_height + 5), smile_img if smile_img.mode == 'RGBA' else None)

# Save the combined image
output_path = r'c:\Users\tehre\OneDrive\Desktop\marketing_agency\frontend\public\logos\amazon-logo.png'
combined.save(output_path, 'PNG')

print(f"Combined logo saved to: {output_path}")
print(f"Dimensions: {combined.size}")
