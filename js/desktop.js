class Desktop {
    constructor() {
        this.windows = new Map();
        this.windowZIndex = 100;
        this.activeWindow = null;
        this.projects = [];
        this.init();
    }

    init() {
        this.loadProjects();
        this.createDesktop();
        this.updateTime();
        setInterval(() => this.updateTime(), 1000);
    }

    loadProjects() {
        console.log('Loading projects for GitHub Pages...');
        
        this.projects = [
            {
                "id": "project0",
                "name": "Project 0: Becoming Friends with Your Camera",
                "title": "Becoming Friends with Your Camera",
                "content": `
# Part 1: Selfie: The Wrong Way vs. The Right Way 

<img src="assets/p0/s1.JPG" alt="Selfie Comparison" style="width: 200px; height: auto;">
<img src="assets/p0/s2.jpg" alt="Selfie Comparison" style="width: 200px; height: auto;">
<img src="assets/p0/s3.jpg" alt="Selfie Comparison" style="width: 200px; height: auto;">
<img src="assets/p0/s4.jpg" alt="Selfie Comparison" style="width: 200px; height: auto;">

The subject(Mohammed Ashfak Amin) looks must more normal and natural in the second selfie, as the first selfie was taken from the camera very close to his face, making the face ratio look distored as the things in the center of the picture look enlarged while the things in the background look smaller.
Moving the camera backward by a feet made the things in the background look normal and the face ratio look natural, because this is usually how the human eye perceives the subject(Mohammed Ashfak Amin).


# Part 2: Architectural Perspective Compression

<img src="assets/p0/env1.JPG" alt="Architectural Perspective Compression" style="width: 400px; height: auto;">
<img src="assets/p0/env2.JPG" alt="Architectural Perspective Compression" style="width: 400px; height: auto;">

In the first photo(zoomed in), thelong sidewalk and trees appear flattened. Distances between objects along the path look compressed and the objects such as parking meters, trees, and people in the background seem bunched closer together.
In the second photo(closer photo without zoom), the depth is now exaggerated. The same parking meters and trees feel more spaced out, and you can tell more easily how far apart things are.

The effect here is caused by the relative differences. Standing farther away and zooming in reduces the relative difference in distances between near and far objects, so the scene looks compressed. On the other hand, standing closer exaggerates those differences, so depth looks stretched out.

# Part 3: The Dolly Zoom

<img src="assets/p0/veritgo.gif" alt="Dolly Zoom" style="width: 500px; height: auto;">

Dolly Zoom Effect Demonstration on a Yoruba culture statue on a table (with other objects in the background to show image warp effect better)
`
            },
{
"id": "project1",
"name": "Project 1: Images of the Russian Empire",
                "title": "Colorizing the Prokudin-Gorskii Photo Collection",
                "content": `
# Overview

This project implements an automatic colorization algorithm for the digitized Prokudin-Gorskii glass plate images. 

The goal is to take these digitized glass plate images and automatically produce color images by extracting the three color channels, aligning them, and combining them into a single RGB color image.

## Approach

The algorithm divides each glass plate image into three equal parts (B, G, R channels from top to bottom) and aligns the G and R channels to the B channel using a gradient-based pyramid alignment technique.

### Algorithm Implementation

The final implementation uses **gradient-based alignment with pyramid optimization**:

1. **Cropping**: Use 1/3 margin cropping to avoid edge artifacts during alignment
2. **Gradient-based scoring**: Uses image gradients/edges for alignment rather than raw pixel values, which is more robust when color channels have different brightness distributions
3. **Search window**: Exhaustive search over a ±25 pixel displacement window for optimal alignment
4. **Pyramid search**: For large images, implements a coarse-to-fine approach starting from downsampled versions and refining at higher resolutions
5. **Normalized Cross-Correlation**: Computes alignment score using gradient information

### NCC vs Gradient NCC

The algorithm uses two different similarity metrics for alignment:

**Standard NCC (Normalized Cross-Correlation)** which compares raw pixel intensities between image channels
<div style="text-align: center; font-size: 16px; margin: 10px 0; font-family: 'Times New Roman', serif;"><em>NCC</em> = <span style="font-size: 20px;">∑</span> <em>I</em><sub>1</sub> · <em>I</em><sub>2</sub> / (||<em>I</em><sub>1</sub>|| · ||<em>I</em><sub>2</sub>||)</div>

This works well when channels have similar brightness distributions but can fail when color filters create different exposure levels.

**Gradient NCC** which compares gradient(using np.gradient()) instead of raw pixels  
<div style="text-align: center; font-size: 16px; margin: 10px 0; font-family: 'Times New Roman', serif;"><em>NCC</em><sub>grad</sub> = <span style="font-size: 20px;">∑</span> ∇<em>I</em><sub>1</sub> · ∇<em>I</em><sub>2</sub> / (||∇<em>I</em><sub>1</sub>|| · ||∇<em>I</em><sub>2</sub>||)</div>

This is more robust to brightness differences between color channels.

## Results

### Basic Cropping on Small Images

Here are comparisons showing how the results differ when edge cropping is applied versus when it's not. The algorithm crops 1/3 margins from each side during alignment scoring to avoid edge artifacts that can mislead the alignment process.
Edge regions of the glass plate images often contain artifacts, uneven illumination, or registration marks that can mislead the alignment algorithm. 
**Cathedral**

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="text-align: center;">
<img src="assets/p1/withoutCrop/cathedral.jpg.jpg" alt="Cathedral - Without Cropping" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Without Cropping</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (1, -1) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (7, -1)</p>
</div>
<div style="text-align: center;">
<img src="assets/p1/in/cathedral.jpg.jpg" alt="Cathedral - With Cropping" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>With Cropping</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (5, 2) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (12, 3)</p>
</div>
</div>

**Monastery**

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="text-align: center;">
<img src="assets/p1/withoutCrop/monastery.jpg.jpg" alt="Monastery - Without Cropping" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Without Cropping</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (-6, 0) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (9, 1)</p>
</div>
<div style="text-align: center;">
<img src="assets/p1/in/monastery.jpg.jpg" alt="Monastery - With Cropping" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>With Cropping</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (-3, 2) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (3, 2)</p>
</div>
</div>

**Tobolsk**

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="text-align: center;">
<img src="assets/p1/withoutCrop/tobolsk.jpg.jpg" alt="Tobolsk - Without Cropping" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Without Cropping</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (3, 2) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (6, 3)</p>
</div>
<div style="text-align: center;">
<img src="assets/p1/in/tobolsk.jpg.jpg" alt="Tobolsk - With Cropping" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>With Cropping</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (3, 3) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (7, 3)</p>
</div>
</div>

### Large Images with Consistent Alignment

These large images achieved consistent alignment results using the pyramid approach and the normal cross correlation approach. 

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0; justify-items: center;">

<div style="text-align: center;">
<img src="assets/p1/in/church.tif.jpg" alt="Church" style="width: 100%; height: auto; max-width: 280px; display: block; margin: 0 auto;">
<h4 style="margin: 10px 0 5px 0;">Church</h4>
<p style="font-size: 12px; margin: 5px 0;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (25, 4) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (58, -4)</p>
</div>

<div style="text-align: center;">
<img src="assets/p1/in/lugano.tif.jpg" alt="Lugano" style="width: 100%; height: auto; max-width: 280px; display: block; margin: 0 auto;">
<h4 style="margin: 10px 0 5px 0;">Lugano</h4>
<p style="font-size: 12px; margin: 5px 0;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (40, -15) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (92, -28)</p>
</div>

<div style="text-align: center;">
<img src="assets/p1/in/siren.tif.jpg" alt="Siren" style="width: 100%; height: auto; max-width: 280px; display: block; margin: 0 auto;">
<h4 style="margin: 10px 0 5px 0;">Siren</h4>
<p style="font-size: 12px; margin: 5px 0;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (49, -5) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (96, -23)</p>
</div>

<div style="text-align: center;">
<img src="assets/p1/in/italil.tif.jpg" alt="Italil" style="width: 100%; height: auto; max-width: 280px; display: block; margin: 0 auto;">
<h4 style="margin: 10px 0 5px 0;">Italil</h4>
<p style="font-size: 12px; margin: 5px 0;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (37, 21) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (76, 36)</p>
</div>

<div style="text-align: center;">
<img src="assets/p1/in/lastochikino.tif.jpg" alt="Lastochikino" style="width: 100%; height: auto; max-width: 280px; display: block; margin: 0 auto;">
<h4 style="margin: 10px 0 5px 0;">Lastochikino</h4>
<p style="font-size: 12px; margin: 5px 0;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (-3, -2) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (75, -8)</p>
</div>

</div>

### Gradient NCC

These large images required gradient-based alignment to achieve proper results, showing dramatic improvements over pixel-based methods.

**Emir**

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="text-align: center;">
<img src="assets/p1/basicin/emir.tif.jpg" alt="Emir - Before" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Standard NCC</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (48, 24) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (56, 12)</p>
</div>
<div style="text-align: center;">
<img src="assets/p1/in/emir.tif.jpg" alt="Emir - After" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Gradient NCC</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (49, 24) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (106, 41)</p>
</div>
</div>

**Self Portrait**

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="text-align: center;">
<img src="assets/p1/basicin/self_portrait.tif.jpg" alt="Self Portrait - Before" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Standard NCC</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (66, 25) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (9, 61)</p>
</div>
<div style="text-align: center;">
<img src="assets/p1/in/self_portrait.tif.jpg" alt="Self Portrait - After" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Gradient NCC</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (77, 29) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (175, 37)</p>
</div>
</div>

**Melons**

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="text-align: center;">
<img src="assets/p1/basicin/melons.tif.jpg" alt="Melons - Before" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Standard NCC</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (66, 5) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (66, 17)</p>
</div>
<div style="text-align: center;">
<img src="assets/p1/in/melons.tif.jpg" alt="Melons - After" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Gradient NCC</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (82, 10) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (178, 13)</p>
</div>
</div>

**Three Generations**

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="text-align: center;">
<img src="assets/p1/basicin/three_generations.tif.jpg" alt="Three Generations - Before" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Standard NCC</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (50, 14) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (66, 10)</p>
</div>
<div style="text-align: center;">
<img src="assets/p1/in/three_generations.tif.jpg" alt="Three Generations - After" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Gradient NCC</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (49, 15) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (109, 11)</p>
</div>
</div>

**Harvesters**

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="text-align: center;">
<img src="assets/p1/basicin/harvesters.tif.jpg" alt="Harvesters - Before" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Standard NCC</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (59, 17) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (66, 14)</p>
</div>
<div style="text-align: center;">
<img src="assets/p1/in/harvesters.tif.jpg" alt="Harvesters - After" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Gradient NCC</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (59, 17) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (123, 15)</p>
</div>
</div>

**Icon**

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="text-align: center;">
<img src="assets/p1/basicin/icon.tif.jpg" alt="Icon - Before" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Standard NCC</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (41, 18) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (66, 23)</p>
</div>
<div style="text-align: center;">
<img src="assets/p1/in/icon.tif.jpg" alt="Icon - After" style="width: 300px; height: auto; display: block; margin: 0 auto;">
<p><em>Gradient NCC</em></p>
<p style="font-size: 12px;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (41, 18) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (89, 23)</p>
</div>
</div>

### Collection Photos

Here are some additional images from the Prokudin-Gorskii collection.

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0; justify-items: center;">

<div style="text-align: center;">
<img src="assets/p1/in/[COLLECTION] Napoleon.jpg.jpg" alt="Napoleon" style="width: 100%; height: auto; max-width: 280px; display: block; margin: 0 auto;">
<h4 style="margin: 10px 0 5px 0;">Napoleon</h4>
<p style="font-size: 12px; margin: 5px 0;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (6, 1) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (13, 0)</p>
</div>

<div style="text-align: center;">
<img src="assets/p1/in/[COLLECTION] Woman in traditional.tif.jpg" alt="Woman in Traditional Dress" style="width: 100%; height: auto; max-width: 280px; display: block; margin: 0 auto;">
<h4 style="margin: 10px 0 5px 0;">Woman in Traditional Dress</h4>
<p style="font-size: 12px; margin: 5px 0;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (48, 40) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (109, 56)</p>
</div>

<div style="text-align: center;">
<img src="assets/p1/in/[COLLECTION]Milan.tif.jpg" alt="Milan" style="width: 100%; height: auto; max-width: 280px; display: block; margin: 0 auto;">
<h4 style="margin: 10px 0 5px 0;">Milan</h4>
<p style="font-size: 12px; margin: 5px 0;"><span style="color: #22c55e; font-weight: 500;">Green Shift:</span> (55, 14) | <span style="color: #ef4444; font-weight: 500;">Red Shift:</span> (124, 25)</p>
</div>

</div>


`},
{
"id": "project2",
"name": "Project 2: Fun with Filters and Frequencies",
"title": "Fun with Filters and Frequencies",
"content": `
# Overview

In this project, I implemented various image processing techniques using filters and frequency domain operations.
This involved implementing convolutions from scratch, finite difference operators, and Derivative of Gaussian (DoG) Filter.
I also implemented unsharp masking technique for image enhancement and multi-resolution image decomposition.

# Part 1: Fun with Filters

## 1.1 Convolutions from Scratch

I implemented 2D convolution using two different approaches:</p>

<ul>
<li><strong>Four-loop implementation:</strong> Nested loops for image rows, columns, and kernel dimensions</li>

For the four-loop implementation, I used nested loops to iterate over the image and kernel.

\`\`\`python3
def conv_four_loops(img, kern):
    h, w = img.shape
    kh, kw = kern.shape
    padH, padW = kh // 2, kw // 2
    
    pad = np.zeros((h + 2 x padH, w + 2 x padW))
    pad[padH:padH + h, padW:padW + w] = img
    
    out = np.zeros_like(img)
    for y in range(h):
        for x in range(w):
            for i in range(kh):
                for j in range(kw):
                    out[y, x] += pad[y + i, x + j] * kern[i, j]
    return out
\`\`\`


<li><strong>Two-loop implementation:</strong> Optimized version using numpy array operations for kernel multiplication</li>

For the two-loop implementation, I used numpy array operations to iterate over the image and kernel.

\`\`\`python3
def conv_two_loops(img, kern):
    h, w = img.shape
    kh, kw = kern.shape
    padH, padW = kh // 2, kw // 2
    
    pad = np.zeros((h + 2 x padH, w + 2 x padW))
    pad[padH:padH + h, padW:padW + w] = img
    flipped = np.flip(kern, axis=(0, 1))
    
    out = np.zeros_like(img)
    for y in range(h):
        for x in range(w):
            region = padded[i:i+kh, j:j+kw]
            out[x, y] = np.sum(region * flipped)
    return out
\`\`\`

<li><strong>Scipy Implementation:</strong> \Verified results match <code>scipy.signal.convolve2d</code></li>


<img src="assets/p2/1.1.png" alt="Finite Difference Result" style="width: 100%; height: auto;">
There is also a my picture gone through the Dx and Dy operators to detect the vertical and horizontal edges.



### 1.2 Finite Difference Operator

For this part of the project, I implemented a finite difference operator to detect edges in the cameraman image.
I used the Dx and Dy operators to detect edges in the image and combined them using the gradient magnitude formula.
We then applied a threshold of 0.07 to create a binary edge image.

\`\`\`python3
partial_x = convolve2d(cameraman, Dx, mode='same')
partial_y = convolve2d(cameraman, Dy, mode='same')
gradient_magnitude = np.sqrt(partial_x^2 + partial_y^2)
\`\`\`

I were able to detect the edges of the buildings and the grass while filtering out most sky noise and I tried to keep most of the skyline intact.
The threshold of 0.07 was a decent enough balance between edge preservation and noise suppression.

<img src="assets/p2/1.2.png" alt="Derivative of Gaussian" style="width: 100%; height: auto;">


### 1.3 Derivative of Gaussian (DoG) Filter

Thenm I implemented a Derivative of Gaussian (DoG) Filter to enhance edge detection.
This involved applying a Gaussian filter to the image and then computing the gradients of the image(σ=2.0, kernel size=15x15).
I then created derivative of Gaussian filters by convolving Gaussian kernel with Dx and Dy.
Then, I applied a threshold of 0.07 to create a binary edge image.


Here is the DoG filters visualization.

<div style="text-align: center;">
<img src="assets/p2/1.3.png" alt="Sharpening Result" style="width: 100%; height: auto; display: block; margin: 0 auto;">
</div>

Here are the results of the DoG filters.
This significantly reduced the noise in the gradient computation and enabled us to see a much clearer image while using the same threshold of 0.07 compared to raw finite differences.



<div style="text-align: center;">
<img src="assets/p2/1.3p2.png" alt="Sharpening Process" style="width: 100%; height: auto; display: block; margin: 0 auto;">
</div>

# Part 2: Fun with Frequencies

## 2.1 Image "Sharpening"

For this part of the project, I implemented an unsharp masking technique for image enhancement.
This involved subtracting a Gaussian-blurred version from the original image and then adding the result back to the original image.
The formula for the unsharp masking is \`sharpened = original + α × (original - blurred)\`.
Since we are applying the unsharp masking to the image, we need to apply it to each color channel separately.


For the blurring, we use a adjustable blur strength (σ) and enhancement factor (α)


**Technical Implementation:**
\`\`\`python3
def sharpner(img, sigma, alpha):
    for channel in range(s_image.shape[2]):
        blurred_channel = convolve2d(s_image[:,:,channel], gaussian_2d, mode='same')
        high_freq = s_image[:,:,channel] - blurred_channel
        sharpened[:,:,channel] = s_image[:,:,channel] + alpha * high_freq
\`\`\`


### 2.1.1 Taj Mahal

This is the result of the unsharp masking on the Taj Mahal image.
We applied multiple different alpha values to see the effect of the unsharp masking.
The stronger the alpha value, the more sharp the image becomes. At the very higher alpha values, the image becomes too sharp and the details look very unnatural.

<div style="text-align: center;">
<img src="assets/p2/2.1.1.0.png" alt="Low Frequency Component" style="width: 100%; height: auto; display: block; margin: 0 auto;">
</div>

<img src="assets/p2/2.1.1.1.png" alt="Low Frequency Component" style="width: 100%; height: auto; display: block; margin: 0 auto;">
<img src="assets/p2/2.1.1.2.png" alt="Low Frequency Component" style="width: 100%; height: auto; display: block; margin: 0 auto;">
<img src="assets/p2/2.1.1.4.png" alt="Low Frequency Component" style="width: 100%; height: auto; display: block; margin: 0 auto;">


### 2.1.2 Berkeley Campus

Here is the result of the unsharp masking on the Berkeley Campus image.
<div style="text-align: center;">
<img src="assets/p2/2.1.2.png" style="width: 100%; height: auto; display: block; margin: 0 auto;">
</div>

### 2.1.3 Goat across Washington Cascades

I actually blurred the image from the get-go and tried to apply the unsharp masking to the image.
The result was good and I was able to recreate the picture similar to the original by pumping the parameters up.

Since I added a general noise across the image, I had to increase the sigma values too.

<div style="text-align: center;">
<img src="assets/p2/2.1.3.png" alt="Hybrid Image" style="width: 100%; height: auto; display: block; margin: 0 auto;">
</div>


### 2.2 Hybrid Images

For this part of the project, I implemented a hybrid image technique.

This componenet involved having a low pass filter and a high pass filter and then adding them together.
For both we use an adjustable cutoff frequency (σ).

For this project, the choices of the kind of images and the cutoff frequency were very important.
Images with distinct features and sometimes similar features among each other created very interesting blend results.

For the varation in the cutoff frequency, I found using higher cutoff frequency for the high-pass filter and lower cutoff frequency for the Gaussian blur resulted in a more pronounced low-frequency component, while a higher cutoff frequency for the high-pass filter emphasized more details from the second image.
We were limited to grayscale images.

I also worked on FFT analysis for frequency domain visualization.
This helped me understand the frequency domain of the images and how the different frequency components are combined to create the hybrid image.


Here is a rough implemntation of the hybrid image.
\`\`\`python3
def hybrid_image(im1, im2, sigma1, sigma2):
    # Convert to grayscale
    im1_gray = color.rgb2gray(im1)
    im2_gray = color.rgb2gray(im2)
    
    gaussian_2d1 = np.outer(cv2.getGaussianKernel(kernel_size, sigma1), cv2.getGaussianKernel(kernel_size, sigma1).T)
    gaussian_2d2 = np.outer(cv2.getGaussianKernel(kernel_size, sigma2),cv2.getGaussianKernel(kernel_size, sigma2).T)
    
    low_freq = convolve2d(im2_gray, gaussian_2d2, mode='same')
    high_freq = im1_gray - convolve2d(im1_gray, gaussian_2d1, mode='same')
    
    return np.clip(low_freq + high_freq, 0, 1)
\`\`\`


### 2.2.1 Derek and Nutmeg

Here is the result of the hybrid image on the Derek and Nutmeg image. I used the cutoff frequency of 6 and 3 for the high and low pass filters respectively.

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="text-align: center;">
<img src="assets/p2/2.2.1.png" alt="Derek and Nutmeg" style="width: 400px; height: auto; display: block; margin: 0 auto;">
</div>
<div style="text-align: center;">
<img src="assets/p2/2.2.1.2.png" alt="Derek and Nutmeg FFT Breakdown" style="width: 600px; height: auto; display: block; margin: 0 auto;">
</div>
</div>


### 2.2.2 K Spice

This is a blend of my roommate Kinshuk and popular artist Ice Spice. My inspiration was from the similarities in their hairstyle and facial expressions. 
I used the cutoff frequency of 5 and 1.5 for the high and low pass filters respectively.

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="text-align: center;">
<img src="assets/p2/2.2.2.1.png" alt="K Spice" style="width: 400px;   height: auto; display: block; margin: 0 auto;">
</div>
<div style="text-align: center;">
<img src="assets/p2/2.2.2.2.png" alt="K Spice FFT Breakdown" style="width: 600px; height: auto; display: block; margin: 0 auto;">
</div>
</div>


### 2.2.3 Merrick Motion Blur


This is a blend of my acquaintance Merrick with 2 stills that involve him turning around. I wanted to capture almost a motion blur effect through the blending. I used the cutoff frequency of 5 and 3 for the high and low pass filters respectively.

If you zoom in, you can see merrick starting at you, while if you zoom out, you can see merrick turning around. 

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="text-align: center;">
<img src="assets/p2/2.2.3.1.png" alt="Merrick Motion Blur" style="width: 400px; height: auto; display: block; margin: 0 auto;">
</div>
<div style="text-align: center;">
<img src="assets/p2/2.2.3.2.png" alt="Merrick Motion Blur FFT Breakdown" style="width: 600px; height: auto; display: block; margin: 0 auto;">
</div>
</div>


### 2.2.4 Long Face Emote

I was experimenting with anmimated chracters and people blending in this. I tried to capture the emotion of the character through the blending both animate and real-life.
I used the cutoff frequency of 10 and 4 for the high and low pass filters respectively.

<div style="display: flex; gap: 20px; margin: 20px 0;">
<div style="text-align: center;">
<img src="assets/p2/2.2.4.1.png" alt="Long Face Emote" style="width: 400px; height: auto; display: block; margin: 0 auto;">
</div>
<div style="text-align: center;">
<img src="assets/p2/2.2.4.2.png" alt="Long Face Emote FFT Breakdown" style="width: 600px; height: auto; display: block; margin: 0 auto;">
</div>
</div>

### 2.3 Gaussian and Laplacian Stacks

For this part, I implemnted both the Guassian stack and the Laplacian stack. 
I was using a fixed kernel size of 9x9 for the Gaussian stack and the Laplacian stack.
For the Gaussian stack, I used a progressive smoothing with increasing σ values.
For the Laplacian stack, I used a difference between consecutive Gaussian levels.

I also worked on the visualization of the frequency bands.
Moreover, I used a proper normalization for displaying frequency bands.

Here is the recreation of the textbook figure from the oranple creation, showing the 4 levels of the Gaussian and Laplacian stacks.

<img src="assets/p2/2.3.png" alt="Gaussian and Laplacian Stacks" style="width: 100%; height: auto;">



### 2.4 Multiresolution Blending

For this section, I had to work upon 2.3 and recreate the oraple type blended images myself.

For the blending, I created 2 different masks, horizontal and irregular masks.
For the Irregular masks, I created elliptical masks with customizable parameters and added parameters to position masks anywhere in the image.

For the multi-scale processing, I applied masks at each pyramid level.
For the horizontal masks, I created horizontal masks with customizable parameters.


### 2.4.1 Orange + Apple = Oraple

Here is the recreation of the oraple type blended images.

I used the horizontal masks for the blending.
And then at the bottom is the level by level blending of the masks.


<div style="text-align: center;">
<img src="assets/p2/2.4.1.0.png" alt="Enhancement Base" style="width: 100%; height: auto; display: block; margin: 0 auto;">
<h4 style="margin: 10px 0 5px 0;">Base Image</h4>
<p style="font-size: 12px; margin: 5px 0;"><em>Base image for enhanced processing</em></p>
</div>



<div style="text-align: center;">
<img src="assets/p2/2.4.1.01.png" alt="Enhancement Step 1" style="width: 100%; height: auto; display: block; margin: 0 auto;">
<h4 style="margin: 10px 0 5px 0;">Final Result</h4>
<p style="font-size: 12px; margin: 5px 0;"><em>First enhancement step</em></p>
</div>

### 2.4.2 Symmetry of Architecture

This project has Humayun’s Tomb and Taj Mahal blended together.
I was enaboured by the symmetry and simmilarities of both of the classic Indian architectural wonders.
I used the horizontal masks for the blending.
And then at the bottom is the level by level blending of the masks.

<div style="text-align: center;">
<img src="assets/p2/2.4.1.1.png" alt="Enhancement Step 2" style="width: 100%; height: auto;  display: block; margin: 0 auto;">
<h4 style="margin: 10px 0 5px 0;">Gaussian Blur and Laplacian Stack</h4>
</div>

<div style="text-align: center;">
<img src="assets/p2/2.4.1.2.png" alt="Enhancement Final" style="width: 100%; height: auto; display: block; margin: 0 auto;">
<h4 style="margin: 10px 0 5px 0;">Final Result</h4>
</div>

### 2.4.3 The Emir of Glendora


Here is my friend Nathan blended into the Emir project from Project 1. 
I utilized the irregular mask for this project, creating a circular mask with an offset to have a perfect blend between the subject's face and the emir's outline.

Below also is the pyrmamid break down of the image highlighting exactly how it was made utilizing laplassian and gaussian stacks.

<div style="text-align: center;">
<img src="assets/p2/2.4.2.png" alt="Experiment 1" style="width: 100%; height: auto; display: block; margin: 0 auto;">
<p><em>Additional experimental technique</em></p>
</div>

<div style="text-align: center;">
<img src="assets/p2/2.4.2.2.png" alt="Experiment 2" style="width: 100%; height: auto; display: block; margin: 0 auto;">
<p><em>Further experimental results</em></p>
</div>

### 2.4.4 There is something in my Malatang

Here is my friend Owen irregularly blended into the a dish of Malatang.
I used the irregular mask for this project, creating an eclipse around the subject's face and inserting him in the center of the dish.

<img src="assets/p2/2.4.3.png" alt="Creative Application" style="width: 100%; height: auto display: block; margin: 0 auto;">



## Conclusion

This was a super cool project where I spent a lot of time exploring different blending techniques and how to use them to create interesting and creative images.

I was able to develop a better understanding of the frequency details, convolutions, multi-scale processing, and more, utiilzing all these techniquesto create interesting and creative images.

Thank you!

This project successfully demonstrated fundamental computer vision concepts:
`}
    ];

    }

    createDesktop() {
        const desktop = document.createElement('div');
        desktop.className = 'winxp-desktop';
        desktop.onclick = (e) => {
            if (e.target === desktop) {
                this.clearSelection();
            }
        };

        const iconsContainer = document.createElement('div');
        iconsContainer.className = 'desktop-icons';

        this.projects.forEach(project => {
            const folder = this.createProjectFolder(project);
            iconsContainer.appendChild(folder);
        });

        desktop.appendChild(iconsContainer);
        this.createTaskbar();
        document.body.appendChild(desktop);
    }

    createProjectFolder(project) {
        const folder = document.createElement('div');
        folder.className = 'desktop-icon';
        folder.setAttribute('data-project-id', project.id);

        const icon = document.createElement('div');
        icon.className = 'icon';
        icon.textContent = '📁';

        const label = document.createElement('div');
        label.className = 'icon-text';
        label.textContent = project.name;

        folder.appendChild(icon);
        folder.appendChild(label);

        folder.addEventListener('click', (e) => {
            e.stopPropagation();
            this.openProject(project);
        });

        return folder;
    }

    createTaskbar() {
        const taskbar = document.createElement('div');
        taskbar.className = 'taskbar';

        const taskbarWindows = document.createElement('div');
        taskbarWindows.className = 'taskbar-windows';
        taskbarWindows.id = 'taskbar-windows';

        const systemTray = document.createElement('div');
        systemTray.className = 'system-tray';

        const timeDisplay = document.createElement('div');
        timeDisplay.className = 'time';
        timeDisplay.id = 'time-display';

        systemTray.appendChild(timeDisplay);

        taskbar.appendChild(taskbarWindows);
        taskbar.appendChild(systemTray);

        document.body.appendChild(taskbar);
    }

    updateTime() {
        const timeDisplay = document.getElementById('time-display');
        if (timeDisplay) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            timeDisplay.textContent = timeString;
        }
    }

    selectFolder(folder) {
        // Clear previous selections
        document.querySelectorAll('.desktop-icon').forEach(f => {
            f.style.backgroundColor = '';
        });
        
        // Select current folder
        folder.style.backgroundColor = 'rgba(36, 94, 219, 0.5)';
    }

    clearSelection() {
        document.querySelectorAll('.desktop-icon').forEach(f => {
            f.style.backgroundColor = '';
        });
    }

    openProject(project) {
        const windowId = `project-${project.id}`;
        
        if (this.windows.has(windowId)) {
            this.focusWindow(windowId);
            return;
        }

        const window = this.createWindow(windowId, project.name, 900, 700);
        const projectViewer = new ProjectViewer(project);
        window.querySelector('.window-content').appendChild(projectViewer.element);
        
        this.windows.set(windowId, { element: window, component: projectViewer });
    }

    createWindow(id, title, width, height) {
        const window = document.createElement('div');
        window.className = 'window active';
        window.setAttribute('data-window-id', id);
        window.style.width = `${width}px`;
        window.style.height = `${height}px`;
        window.style.left = `${50 + this.windows.size * 30}px`;
        window.style.top = `${50 + this.windows.size * 30}px`;
        window.style.zIndex = ++this.windowZIndex;

        const header = document.createElement('div');
        header.className = 'window-header';

        const titleElement = document.createElement('div');
        titleElement.className = 'window-title';
        titleElement.textContent = title;

        const controls = document.createElement('div');
        controls.className = 'window-controls';

        const minimizeBtn = document.createElement('div');
        minimizeBtn.className = 'window-control minimize';
        minimizeBtn.onclick = () => this.minimizeWindow(id);

        const maximizeBtn = document.createElement('div');
        maximizeBtn.className = 'window-control maximize';
        maximizeBtn.onclick = () => this.maximizeWindow(id);

        const closeBtn = document.createElement('div');
        closeBtn.className = 'window-control close';
        closeBtn.onclick = () => this.closeWindow(id);

        const content = document.createElement('div');
        content.className = 'window-content';

        controls.appendChild(minimizeBtn);
        controls.appendChild(maximizeBtn);
        controls.appendChild(closeBtn);

        header.appendChild(titleElement);
        header.appendChild(controls);

        window.appendChild(header);
        window.appendChild(content);

        // Make window draggable
        this.makeDraggable(window, header);

        // Make window focusable
        window.onclick = () => this.focusWindow(id);

        // Add taskbar entry
        this.addTaskbarEntry(id, title);

        document.body.appendChild(window);
        this.focusWindow(id);

        return window;
    }

    makeDraggable(window, handle) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        handle.addEventListener('mousedown', dragStart);

        function dragStart(e) {
            if (e.target.classList.contains('window-control')) return;
            
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === handle) {
                isDragging = true;
            }
        }

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                xOffset = currentX;
                yOffset = currentY;

                window.style.left = `${currentX}px`;
                window.style.top = `${currentY}px`;
            }
        }

        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
        }
    }

    addTaskbarEntry(windowId, title) {
        const taskbarWindows = document.getElementById('taskbar-windows');
        
        const taskbarEntry = document.createElement('div');
        taskbarEntry.className = 'taskbar-window';
        taskbarEntry.setAttribute('data-window-id', windowId);
        
        const icon = document.createElement('div');
        icon.className = 'taskbar-icon';
        icon.textContent = '📁';
        
        const text = document.createElement('div');
        text.className = 'taskbar-text';
        text.textContent = title;
        
        taskbarEntry.appendChild(icon);
        taskbarEntry.appendChild(text);
        
        taskbarEntry.onclick = () => {
            const window = this.windows.get(windowId);
            if (window && window.element.style.display === 'none') {
                this.restoreWindow(windowId);
            } else {
                this.focusWindow(windowId);
            }
        };
        
        taskbarWindows.appendChild(taskbarEntry);
    }

    focusWindow(windowId) {
        // Remove active class from all windows and taskbar entries
        document.querySelectorAll('.window').forEach(w => {
            w.classList.remove('active');
            w.querySelector('.window-header').classList.remove('active');
            w.querySelector('.window-header').classList.add('inactive');
        });
        
        document.querySelectorAll('.taskbar-window').forEach(t => {
            t.classList.remove('active');
        });

        // Add active class to target window
        const window = this.windows.get(windowId);
        if (window) {
            window.element.classList.add('active');
            window.element.querySelector('.window-header').classList.add('active');
            window.element.querySelector('.window-header').classList.remove('inactive');
            window.element.style.zIndex = ++this.windowZIndex;
            this.activeWindow = windowId;
            
            // Activate taskbar entry
            const taskbarEntry = document.querySelector(`[data-window-id="${windowId}"]`);
            if (taskbarEntry) {
                taskbarEntry.classList.add('active');
            }
        }
    }

    closeWindow(windowId) {
        const window = this.windows.get(windowId);
        if (window) {
            window.element.remove();
            this.windows.delete(windowId);
            
            // Remove taskbar entry
            const taskbarEntry = document.querySelector(`[data-window-id="${windowId}"]`);
            if (taskbarEntry) {
                taskbarEntry.remove();
            }
            
            if (this.activeWindow === windowId) {
                this.activeWindow = null;
            }
        }
    }

    minimizeWindow(windowId) {
        const window = this.windows.get(windowId);
        if (window) {
            window.element.style.display = 'none';
            window.element.classList.remove('active');
            
            // Update taskbar entry
            const taskbarEntry = document.querySelector(`[data-window-id="${windowId}"]`);
            if (taskbarEntry) {
                taskbarEntry.classList.remove('active');
            }
            
            if (this.activeWindow === windowId) {
                this.activeWindow = null;
            }
        }
    }

    restoreWindow(windowId) {
        const window = this.windows.get(windowId);
        if (window) {
            window.element.style.display = 'flex';
            this.focusWindow(windowId);
        }
    }

    maximizeWindow(windowId) {
        const window = this.windows.get(windowId);
        if (window) {
            const isMaximized = window.element.classList.contains('maximized');
            
            if (isMaximized) {
                window.element.classList.remove('maximized');
                window.element.style.width = '600px';
                window.element.style.height = '450px';
                window.element.style.left = '100px';
                window.element.style.top = '50px';
            } else {
                window.element.classList.add('maximized');
                window.element.style.width = 'calc(100vw - 4px)';
                window.element.style.height = 'calc(100vh - 34px)';
                window.element.style.left = '0px';
                window.element.style.top = '0px';
            }
        }
    }
}

class ProjectViewer {
    constructor(project) {
        this.project = project;
        this.element = this.createElement();
    }

    createElement() {
        const viewer = document.createElement('div');
        viewer.className = 'project-viewer';

        // Project header with name and title
        const header = this.createHeader();
        viewer.appendChild(header);

        // Project content (markdown converted to HTML)
        const contentContainer = document.createElement('div');
        contentContainer.className = 'project-content';
        contentContainer.innerHTML = this.markdownToHtml(this.project.content);

        viewer.appendChild(contentContainer);

        return viewer;
    }

    createHeader() {
        const header = document.createElement('div');
        header.className = 'project-header';
        
        const name = document.createElement('div');
        name.className = 'project-name';
        name.textContent = this.project.name;
        
        const title = document.createElement('h1');
        title.className = 'project-title';
        title.textContent = this.project.title;
        
        header.appendChild(name);
        header.appendChild(title);
        return header;
    }

    markdownToHtml(markdown) {
        let html = markdown.trim();

        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
            const lang = language || '';
            const escapedCode = code
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
            return `<pre><code class="language-${lang}">${escapedCode}</code></pre>`;
        });

        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<div class="image-wrapper"><img src="$2" alt="$1" class="markdown-image"><p class="image-caption">$1</p></div>');

        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        const lines = html.split('\n');
        let inList = false;
        let inOrderedList = false;
        let inCodeBlock = false;
        const result = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            if (line.includes('<pre><code')) {
                inCodeBlock = true;
            } else if (line.includes('</code></pre>')) {
                inCodeBlock = false;
            }
            
            if (inCodeBlock || line.startsWith('<') || line.includes('<img') || line.includes('<div')) {
                result.push(line);
                continue;
            }
            
            if (/^\d+\.\s/.test(line)) {
                if (!inOrderedList) {
                    if (inList) {
                        result.push('</ul>');
                        inList = false;
                    }
                    result.push('<ol>');
                    inOrderedList = true;
                }
                result.push(`<li>${line.replace(/^\d+\.\s/, '')}</li>`);
            }
            // Unordered list
            else if (/^-\s/.test(line)) {
                if (!inList) {
                    if (inOrderedList) {
                        result.push('</ol>');
                        inOrderedList = false;
                    }
                    result.push('<ul>');
                    inList = true;
                }
                result.push(`<li>${line.replace(/^-\s/, '')}</li>`);
            }
            // End of list
            else {
                if (inList) {
                    result.push('</ul>');
                    inList = false;
                }
                if (inOrderedList) {
                    result.push('</ol>');
                    inOrderedList = false;
                }
                
                // Paragraphs (only for non-HTML lines)
                if (line.trim() && !line.startsWith('<')) {
                    result.push(`<p>${line}</p>`);
                } else {
                    result.push(line);
                }
            }
        }

        // Close any remaining lists
        if (inList) result.push('</ul>');
        if (inOrderedList) result.push('</ol>');

        return result.join('\n');
    }
}

// Initialize desktop when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Desktop();
});
