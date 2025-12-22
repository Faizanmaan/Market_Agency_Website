import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

/**
 * Combines a text image and a smile image into a single logo.
 * Updated to use relative paths and provide better error handling.
 */
async function combineLogos() {
  // Use relative paths or environment variables
  // IMPORTANT: Update these paths to point to your actual source images
  const textImgPath = path.join(process.cwd(), 'public', 'logos', 'text-source.png');
  const smileImgPath = path.join(process.cwd(), 'public', 'logos', 'smile-source.png');
  const outputPath = path.join(process.cwd(), 'public', 'logos', 'amazon-logo.png');

  try {
    // Check if input files exist
    if (!fs.existsSync(textImgPath)) {
      console.error(`Error: Text image missing at ${textImgPath}`);
      console.info('Please place your text source image at the path above or update the script.');
      return;
    }
    if (!fs.existsSync(smileImgPath)) {
      console.error(`Error: Smile image missing at ${smileImgPath}`);
      console.info('Please place your smile source image at the path above or update the script.');
      return;
    }

    // Load images and get metadata
    const textImg = sharp(textImgPath);
    const smileImg = sharp(smileImgPath);

    const [textMeta, smileMeta] = await Promise.all([
      textImg.metadata(),
      smileImg.metadata()
    ]);

    if (!textMeta.width || !textMeta.height || !smileMeta.width || !smileMeta.height) {
      throw new Error('Could not get image dimensions');
    }

    // Calculate dimensions
    const combinedWidth = Math.max(textMeta.width, smileMeta.width);
    const combinedHeight = textMeta.height + smileMeta.height + 5; // 5px spacing

    // Calculate positions for centering
    const textX = Math.floor((combinedWidth - textMeta.width) / 2);
    const smileX = Math.floor((combinedWidth - smileMeta.width) / 2);

    // Create the combined image
    await sharp({
      create: {
        width: combinedWidth,
        height: combinedHeight,
        channels: 4,
        background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent background
      }
    })
    .composite([
      { input: await textImg.toBuffer(), top: 0, left: textX },
      { input: await smileImg.toBuffer(), top: textMeta.height + 5, left: smileX }
    ])
    .toFile(outputPath);

    console.log(`Combined logo successfully saved to: ${outputPath}`);
    console.log(`Dimensions: ${combinedWidth}x${combinedHeight}`);
  } catch (error) {
    console.error('Error combining logos:', error);
  }
}

// Run the function
combineLogos();
