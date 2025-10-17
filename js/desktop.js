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

Overall, the scipy implementation was much faster and more efficient than the custom implementations but the two loop was a bit faster than the four loop implementation.

The convolution layer I applied here was a simple blur filter 3x3 kernel of 1/9 values, adding a gradual blur over the image.

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
For the horizontal masks, I created horizontal masks allowing for the left and right sides of the image to be blended cleanly.
To reduce the blend noise, I created the mask using np.linspace rather than np.ones and np.zeros, making the transition between the two images more smooth.

For the Irregular masks, I created elliptical masks with customizable parameters and added parameters to position masks anywhere in the image.
I also added a noise variable to determine the strength of the mask when overlaying the image.


For the multi-scale processing aspect of this section, I applied the masks at each pyramid level using the Laplacian and Gaussian stacks.


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
I used the irregular mask for this project, creating an eclipse around the subject's face and inserting him in the center of the dish, I also reduced the noice to make the appearance of the center of dish look more abrupt.

<img src="assets/p2/2.4.3.png" alt="Creative Application" style="width: 100%; height: auto display: block; margin: 0 auto;">



## Conclusion

This was a super cool project where I spent a lot of time exploring different blending techniques and how to use them to create interesting and creative images.

I was able to develop a better understanding of the frequency details, convolutions, multi-scale processing, and more, utiilzing all these techniquesto create interesting and creative images.

`}, 

{
    "id": "project3",
    "name": "Project 3: Stitching Photo Mosaics",
    "title": "Stitching Photo Mosaics",
    "content": `
    ## Project Overview

This project explores image warping and mosaicing techniques. The goal is to capture multiple photographs with projective transformations between them and create seamless image mosaics through homography recovery, image warping, and alpha-blended compositing.


## Images and Homographies

I shot multiple sets of photographs with projective transformations(i.e fixed center of projection, rotating camera).
I utilized correspondences between the images to visualize the roation and similar points of interests across the scene.


### Image 1: Cascades Mountain Scene
![Mountain](assets/p3/1.1.1.png)
![Mountain Correspondance](assets/p3/1.1.2.png)

**Recovered Homography H:**
\`\`\`
[[ 1.354e+00  6.151e-05 -4.738e+02]
 [ 3.240e-01  1.338e+00 -1.444e+02]
 [ 7.027e-04  2.228e-05  1.000e+00]]
\`\`\`

### Image 2: Train Panorama
![Train Scene](assets/p3/1.1.3.png)
![Train Scence Correspondance](assets/p3/1.1.4.png)


**Recovered Homography H:**
\`\`\`
[[ 6.404e-01 -4.078e-02 -2.243e+02]
 [-1.940e-01  7.253e-01  8.731e+01]
 [-6.686e-04  1.201e-04  1.000e+00]]
\`\`\`


### Homography and System of Equations

Homography **H** is a 3×3 matrix with 8 degrees of freedom that transforms points: **p' = Hp**

We set up a system of equations **Ah = b** where **h** contains the 8 unknowns of **H** (with H[2,2]=1).

\`\`\`

⎡ a  b  c ⎤   ⎡ x₁ ⎤     ⎡ wx₁' ⎤
⎢ d  e  f ⎥ × ⎢ y₁ ⎥  =  ⎢ wy₁' ⎥
⎣ g  h  1 ⎦   ⎣ 1  ⎦     ⎣  w   ⎦
\`\`\`

For each correspondence (x,y) → (x',y'), we get 2 equations:
\`\`\`
- x' = (h₁·x + h₂·y + h₃) / (h₇·x + h₈·y + 1)
- y' = (h₄·x + h₅·y + h₆) / (h₇·x + h₈·y + 1)
\`\`\`
Rearranging to linear form:
\`\`\`
- x·h₁ + y·h₂ + h₃ - x'·x·h₇ - x'·y·h₈ = x'
- x·h₄ + y·h₅ + h₆ - y'·x·h₇ - y'·y·h₈ = y'
\`\`\`

For each point correspondence (x₁, y₁) → (x₁', y₁'), we create two rows:

\`\`\`
⎡ x₁  y₁  1   0   0  0  -x₁'x₁  -x₁'y₁ ⎤     ⎡ a ⎤     ⎡ x₁' ⎤
⎣  0   0  0  x₁  y₁  1  -y₁'x₁  -y₁'y₁ ⎦  ×  ⎢ b ⎥  =  ⎣ y₁' ⎦
                                              ⎢ c ⎥
                                              ⎢ d ⎥
                                              ⎢ e ⎥
                                              ⎢ f ⎥
                                              ⎢ g ⎥
                                              ⎣ h ⎦
\`\`\`

For n correspondences, we get 2n equations of the form **Ph = q**, which we solve using least squares: **h = (PᵀP)⁻¹Pᵀq**.



## Warping and Rectification

fter we recovered the homography, we want to be able to warp images using it. To do this, we take the 4 corners of the image we would like to warp and apply **H** to get the transformed coordinates in the warped image space.

For an image with width **w** and height **h**, we transform the corners:

\`\`\`
corners = [[0, 0], [w-1, 0], [0, h-1], [w-1, h-1]]
warped_corners = H × corners
\`\`\`

After applying the homography, we need to normalize by the homogeneous coordinate:

\`\`\`
warped_corners = warped_corners[:2] / warped_corners[2]
\`\`\`

Afterwards, we create a **bounding box** in the warped image that contains these morphed corners. This determines the output image dimensions:

\`\`\`
min_x = floor(min(warped_corners[0]))
max_x = ceil(max(warped_corners[0]))
min_y = floor(min(warped_corners[1]))
max_y = ceil(max(warped_corners[1]))
output_size = (max_y - min_y + 1, max_x - min_x + 1)
\`\`\`


### Nearest Neighbor

I found that NN interpolation is very fast as it rounded coordinates to its nearest neighbours and was around 2-3x faster than Bilinear.
However, this speed comes at the cost of quality—results often appear blocky and pixelated, with jagged edges and visible staircase artifacts due to alisasing Smooth gradients turn into harsh bands, and fine details lose clarity. It’s best suited for quick tests, debugging, or real-time previews where performance matters more than visual fidelity.

### Bilinear

Bilinear interpolation produces much smoother and more visually appealing results by computing a weighted average of the four nearest pixels for each output pixel. This yields anti-aliased edges, continuous gradients, and clearer fine details, making the output look more professional and natural.

For our mosaics, we use **bilinear interpolation** to ensure high-quality seamless blending.

### Rectification

Before creating full mosaics, we can test our homography and warping implementation through **rectification** - making distorted rectangular objects appear rectangular.

For rectification, we:
1. Select 4 corner points of a known rectangular object in the image (e.g., a poster, sign, or building facade)
2. Store these as \`im1_pts\` (source points from the distorted image)
3. Define \`im2_pts\` by hand to be a rectangle:
   \`\`\`
   im2_pts = [[0, 0], [w-1, 0], [0, h-1], [w-1, h-1]]
   \`\`\`
   where \`w\` and \`h\` are the desired width and height of the rectified object, we used the shape of the input image for our case.

This creates a homography that maps the distorted quadrilateral to a perfect rectangle. Since we know the object should be rectangular in the real world, this effectively "undoes" the perspective distortion.

Demonstrating rectification on images with known rectangular objects:

### Example 1: Road Sign Rectification
![Rectification Example 1](assets/p3/1.3.png)

### Example 2: Art Rectification
![Rectification Example 2](assets/p3/1.3.1.png)

The artificats that NN creates are more visble when zoomed into but with lower quality front facing pictures, its less prevelant.


## A.4: Blend Images into a Mosaic

### Blending Procedure

Our mosaic pipeline uses **weighted averaging with alpha masks** to create seamless blends.

Firstly, we compute the canvas size, transofrming all 4 corners of each image through their respective homographies. Then I found the bounding box (min/max x and y) that contains all warped corners which determines the final mosaic dimensions

I applied translation matrix **T** to shift all images into positive coordinates and then warped each image using **T @ H** (where H is the homography to reference frame) using bilinear interpolation for smooth, high-quality warping. All warped images now exist in the same coordinate system with same dimensions

Finally, I created alpha masks (feathering) for each warped image by applying \`distance_transform_edt\` to compute distance from image boundaries and then normalizing distances: **alpha = distance / max_distance**. This creates a natural feathering effect.

For each pixel location (x, y) in the mosaic:
- **numerator = Σ(image_i[x,y] × alpha_i[x,y])** - weighted sum of pixel values
- **denominator = Σ(alpha_i[x,y])** - sum of weights
- **final_pixel = numerator / denominator** - normalized weighted average

In overlap regions, pixels near image centers get higher weight, creating smooth transitions without visible seams or ghosting.

### Mosaic Results

### Mosaic 1: Cascade Mountains
![Moasic1](assets/p3/1.4.1.png)

### Mosaic 2: Train Scene
![Mosaic 2](assets/p3/1.4.2.png)

### Mosaic 3: Emerald Lake
![Mosaic 3](assets/p3/1.4.3.png)

# Part 2: AutoStitching

This part of the project is about automatically stitching images together, rather than manualy picking correspondances like in the previous copy.

## Harris Corner Detection

To start this part, we utilized Harris detector to find interest points in the images.

Then we applied Adaptive Non-Maximal Suppression (ANMS) to keep a spatially uniform subset of strong corners.
A uniform spatial distribution of features is very important for accurately estimating a homography. ANMS ensures this by selecting points that are not just strong, but also well-separated, providing a more stable geometric foundation for the subsequent alignment.
We went from having around 20000 cornerss to limited to 500 points which were evenly distributed across the image.

![Harris corners (no ANMS)](assets/p3.5/1.1.png)
![Harris corners (with ANMS)](assets/p3.5/1.2.png)


## Feature Descriptor Extraction

Then we extracted feature descriptors from the interest points.
From each ANMS-selected keypoint, I extracted an axis-aligned 8×8 descriptor sampled from a blurred 40×40 window centered at the keypoint. Each descriptor vector was also normalized by subtracting its mean and dividing by its standard deviation. This normalization makes the descriptor invariant to affine changes in illumination, meaning it is more robust to differences in brightness and contrast between the two images

It was clear that edges/corners produce distinctive, high-contrast 8×8 patterns; flat regions are less informative.

![Descriptors](assets/p3.5/1.3.1.png)
![Parts of the picture with descriptors](assets/p3.5/1.3.2.png)


## Feature Matching

Then the idea was to match descriptors across image pairs using SSD distance and Lowe’s ratio test to reject ambiguous matches.
Let \`d_1\` and \`d_2\` be nearest and second-nearest SSDs. Accept if \`r = d_1/d_2 < \tau\` (I used \`\tau \approx 0.67\`).

![Matches: Mountains](assets/p3.5/1.3.3.png)
![Matches: Train](assets/p3.5/1.3.4.png)


## RANSAC for Robust Homography and Mosaics

Even after applying Lowe's ratio test, the set of matched features inevitably contains outliers that do not conform to the true geometric transformation between the images. To robustly estimate the homography from this noisy data, we implemented the Random Sample Consensus (RANSAC) algorithm.

Then, I utilized RANSAC to estimate homographies. The idea was to iteratively select a random sample of 4 correspondence points (the minimum required to solve for an 8-DoF homography), computes a candidate homography \`H\`, and then counts how many other matches are consistent with this model.

Finally,  these images are then blended images similar to the first part to form mosaics.
You can see some of the original outlier descriptiors matched grayed out when comparing the 2 images and then the RANSAC matched ones are highlighted in green.

![Auto 1](assets/p3.5/1.4.1.png)
![Auto 2](assets/p3.5/1.4.2.png)
![Auto 3](assets/p3.5/1.4.3.png)

## Comparsion of Manual and Automatic Stitching

Here is a comparison of the manual and automatic stitching results.
We can see that the automatic stitching results are very similar to the manual stitching results.
The automatic stitching results are a bit more smooth and since the points are more uniform and properly aligned, the level of angle change in the perspective is less.
Hence automatic stiching looks a bit more natural and less distorted. However, overall if done right, manual stitching can be just as good with the correct points and homographies.

<div style="display:flex; gap:12px; align-items:flex-start; margin:10px 0 20px;">
<figure style="flex:1; text-align:center; margin:0;">
<img src="assets/p3.5/2.1.png" alt="Manual 1" style="max-width:100%; height:auto;">
<figcaption style="margin-top:8px; font-style:italic;">Manual 1</figcaption>
</figure>
<figure style="flex:1; text-align:center; margin:0;">
<img src="assets/p3.5/2.1.1.png" alt="Auto 1" style="max-width:100%; height:auto;">
<figcaption style="margin-top:8px; font-style:italic;">Auto 1</figcaption>
</figure>
</div>

<div style="display:flex; gap:12px; align-items:flex-start; margin:10px 0 20px;">
<figure style="flex:1; text-align:center; margin:0;">
<img src="assets/p3.5/2.2.png" alt="Manual 2" style="max-width:100%; height:auto;">
<figcaption style="margin-top:8px; font-style:italic;">Manual 2</figcaption>
</figure>
<figure style="flex:1; text-align:center; margin:0;">
<img src="assets/p3.5/2.2.1.png" alt="Auto 2" style="max-width:100%; height:auto;">
<figcaption style="margin-top:8px; font-style:italic;">Auto 2</figcaption>
</figure>
</div>

<div style="display:flex; gap:12px; align-items:flex-start; margin:10px 0 20px;">
<figure style="flex:1; text-align:center; margin:0;">
<img src="assets/p3.5/2.3.png" alt="Manual 3" style="max-width:100%; height:auto;">
<figcaption style="margin-top:8px; font-style:italic;">Manual 3</figcaption>
</figure>
<figure style="flex:1; text-align:center; margin:0;">
<img src="assets/p3.5/2.3.1.png" alt="Auto 3" style="max-width:100%; height:auto;">
<figcaption style="margin-top:8px; font-style:italic;">Auto 3</figcaption>
</figure>
</div>

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
