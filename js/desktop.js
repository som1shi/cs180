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

`},
{
    "id": "project4",
    "name": "Project 4: Neural Radiance Fields",
    "title": "Neural Radiance Fields: From 2D Images to 3D Scenes",
    "content": `

# Overview
# Part 0: Camera Calibration and 3D Scanning

Before training NeRF models, we need to calibrate our camera and determine the pose (position and orientation) of each captured image. 
I utilized the ArUco marker library, specially the Aruco TAG ID 1 and printed a 60MM tag out of it to use as a reference object for 3D Object scanning.

## Camera Calibration Process

Using OpenCV's camera calibration pipeline with ArUco markers:

1. **Marker Detection**: Detected ArUco markers across multiple images from different angles
2. **Calibration**: Computed intrinsic camera matrix **K** and distortion coefficients using \`cv2.calibrateCamera()\`
3. **Pose Estimation**: For each new image, used \`cv2.solvePnP()\` to recover the camera pose (rotation and translation)
4. **Coordinate Systems**: Converted from world-to-camera (w2c) to camera-to-world (c2w) matrices via matrix inversion

The intrinsic camera matrix has the form:

\`\`\`
K = [[focal_x,    0,      cx],
     [0,       focal_y,   cy],
     [0,          0,       1]]
\`\`\`

Where:
- **focal_x, focal_y**: Focal lengths (in pixels)
- **cx, cy**: Principal point (optical center)

## Camera Frustum Visualization

Using the Viser library, we visualized the recovered camera poses in 3D space:

![Camera Frustums in 3D Space](assets/p4/0.1.png)

![Camera Poses Around Object](assets/p4/0.2.png)
![Camera Frustums in 3D Space](assets/p4/0.3.png)
![Camera Frustums in 3D Space](assets/p4/0.4.png)
![Camera Frustums in 3D Space](assets/p4/0.5.png)


## Lens Distortion Correction

Initially, captured images exhibited significant **barrel distortion** (fisheye effect) from the phone camera lens. This was corrected using:

\`\`\`python
new_camera_matrix, roi = cv2.getOptimalNewCameraMatrix(
    camera_matrix, dist_coeffs, (W, H), alpha=0
)
undistorted = cv2.undistort(img, camera_matrix, dist_coeffs, None, new_camera_matrix)
\`\`\`


# Part 1: Fit a Neural Field to a 2D Image

Before tackling 3D scenes, we start simpler: representing a 2D image as a neural network to build intuition for how neural fields work.

## Concept: Images as Functions

Traditionally, images are grids of pixels. Instead, we represent an image as a **continuous function**:

\`\`\`
f(x, y) → (R, G, B)
\`\`\`

A neural network learns this function mapping 2D coordinates to color values.

## Positional Encoding

Raw (x,y) coordinates are **low-frequency** - a simple MLP struggles to represent high-frequency details (sharp edges, textures). We apply **positional encoding** to embed coordinates into a higher-dimensional space:

<div style="text-align: center; font-size: 16px; margin: 10px 0;">
γ(p) = [sin(2<sup>0</sup>πp), cos(2<sup>0</sup>πp), sin(2<sup>1</sup>πp), cos(2<sup>1</sup>πp), ..., sin(2<sup>L-1</sup>πp), cos(2<sup>L-1</sup>πp)]
</div>

Where **L** controls the maximum frequency. Higher L captures finer details but increases overfitting risk.

## Network Architecture

\`\`\`python
class PositionalEncoding:
    def __init__(self, L: int):
        self.L = int(L)
        self.freqs = [2**l * math.pi for l in range(self.L)]
    
    def __call__(self, xy):
        # xy: (N, 2) input coordinates
        # Returns: (N, 2 + 4*L) encoded features
        angles = xy.unsqueeze(-1) * self.freqs
        pe = torch.stack([torch.sin(angles), torch.cos(angles)], dim=-1)
        return torch.cat([xy, pe.flatten(1)], dim=-1)

def make_mlp(in_dim, width=256, depth=4):
    layers = [nn.Linear(in_dim, width), nn.ReLU()]
    for _ in range(depth - 1):
        layers += [nn.Linear(width, width), nn.ReLU()]
    layers += [nn.Linear(width, 3), nn.Sigmoid()]
    return nn.Sequential(*layers)
\`\`\`

**Training**: Sample random pixels per iteration, compute MSE loss between predicted and true RGB values, optimize via Adam.

## Results: Image Reconstruction

Testing on a provided image with different hyperparameters:

![Original Image](assets/p4/1.1.jpg)
![Reconstructed Image with Iterations](assets/p4/1.1.1.png)
![Reconstructed Image with Various Hyperparameters](assets/p4/1.1.3.png)

![Original Image](assets/p4/1.2.jpg)
![Reconstructed Image with Iterations](assets/p4/1.2.1.png)
![Reconstructed Image with Training Parameters](assets/p4/1.2.3.png)
![Training Progression](assets/p4/1.2.2.png)


From the results, we can see that the model is able to reconstruct the image with a good level of detail.
The frequency and width of the model are important for the reconstruction quality.
Higher frequency and width models are able to capture more details and the model is able to reconstruct the image with a good level of detail.
The best combo is W=256, L=10 which achieves the highest PSNR with sharp, detailed reconstruction.

# Part 2: Fit a Neural Radiance Field from Multi-view Images

Now we extend to 3D: representing a scene as a **volumetric radiance field**.

## NeRF Core Concept

NeRF represents a 3D scene as a continuous function:

\`\`\`
F(x, y, z, θ, φ) → (R, G, B, σ)
\`\`\`

Where:
- **(x, y, z)**: 3D position in space
- **(θ, φ)**: Viewing direction  
- **(R, G, B)**: Emitted color
- **σ**: Volume density (how opaque the point is)


### Part 2.1: Create Rays from Cameras
Camera to World Coordinate Conversion
I implemented the transform(c2w, x_c) function to convert points from camera space to world space using the camera-to-world transformation matrix. My implementation handles batched coordinates by first converting 3D points to homogeneous coordinates (appending ones), multiplying by the c2w matrix using PyTorch's @ operator, and extracting the resulting 3D world coordinates. The function automatically detects if the input is already in homogeneous form and handles both cases, making it flexible for different use cases throughout the pipeline.
Pixel to Camera Coordinate Conversion
My pixel_to_camera(K, uv, s) function takes pixel coordinates in UV space and transforms them back to 3D camera coordinates. I extract the u and v components separately, stack them with ones to create homogeneous pixel coordinates, then multiply by the inverse of the intrinsic matrix K to get the camera ray direction. Finally, I scale this direction by the depth parameter s to get the actual 3D position. This implementation efficiently handles batched operations by reshaping to 2D, performing the matrix multiplication via transpose operations, then reshaping back to maintain the original batch dimensions.
Pixel to Ray
I implemented pixel_to_ray(K, c2w, uv) by combining my previous functions. First, I call pixel_to_camera with unit depth (s=1) to get a point in camera space, then transform it to world space using my transform function. The ray origin is extracted from the last column of the c2w matrix (c2w[..., :3, 3]), and I use a while loop to properly broadcast it to match the batch dimensions of the computed world points. The ray direction is computed as the normalized vector from origin to the transformed point, using torch.linalg.norm for normalization. This function is critical for my entire NeRF pipeline since it converts every pixel into a 3D ray.

### Part 2.2: Sampling
Sampling Rays from Images
My RaysData class precomputes all rays for the first training image. I use np.meshgrid with indexing="xy" to generate all pixel coordinates, then add 0.5 to account for pixel centers (a crucial detail for geometric correctness). I precompute all rays by expanding the c2w matrix to match the number of pixels and calling my pixel_to_ray function once. During training, my sample_rays(B) method uses np.random.randint to randomly sample B rays from this precomputed pool. This approach trades memory for speed—I store all 40,000 rays (for a 200x200 image) to avoid recomputation during training.
Sampling Points along Rays
My sample_along_rays function creates sample points between near and far bounds along each ray. I use torch.linspace to generate evenly spaced depth values, then implement stratified sampling when perturb=True by computing interval midpoints and randomly sampling within each interval using torch.rand_like. This perturbation prevents overfitting to specific depth locations. For my Lego scene, I used near=2.0, far=6.0, and 128 samples per ray. For my custom object, I adjusted to near=0.15, far=0.65 (much closer to the camera) with the same 128 samples. The final 3D points are computed as ray_origin + ray_direction * depth.

### Part 2.3: Putting the Dataloading All Together
I created comprehensive visualizations using Viser to verify my implementation. For my first visualization, I sampled 100 random rays with 64 samples each from the first training image, setting perturb=True and point_size=0.02. I then created a more detailed visualization focusing on the top-left corner by sampling from x coordinates 100-200 and y coordinates 0-100, using point_size=0.03 for better visibility. My visualization includes all training camera frustums with scale=0.15 and FOV computed from my intrinsics.
I verified my UV coordinate ordering by asserting that images_train[0, sample_uvs[:,1], sample_uvs[:,0]] matches dataset.pixels, confirming I correctly handle the (x,y) to (height,width) index flip. The Viser plots clearly show rays emanating from the correct camera positions, all staying within the camera frustum, which validates my coordinate transformations are working correctly.



![Rays and Samples 100 Random](assets/p4/2.3.1.png)

![Rays and Samples Vis 2](assets/p4/2.3.2.png)

![Rays and Samples Vis 3](assets/p4/2.3.3.png)

![Rays and Samples Vis 4](assets/p4/2.3.4.png)

### Part 2.4: Neural Radiance Field
Network Architecture
I built my NeRF class as an 8-layer MLP with 256 hidden dimensions. My architecture uses positional encoding with L=10 frequencies for 3D positions and L=4 frequencies for view directions. The network has two main branches: layers 1-4 process the encoded position, then I concatenate the original encoded position at layer 5 (skip connection), followed by layers 5-8 for deeper processing. The feature vector from layer 8 feeds into two separate heads: a single linear layer for density (sigma) and a two-layer head (256→128→3) for RGB color.
My PositionalEncoder implementation uses logarithmically-spaced frequencies (powers of 2) and generates sine/cosine embeddings. For positions with L=10, this produces 63-dimensional encodings (3 + 2×3×10), and for directions with L=4, it produces 27-dimensional encodings (3 + 2×3×4). I carefully use lambda functions with bound frequency values to avoid Python closure issues. The network outputs are constrained using sigmoid for RGB (ensuring 0-1 range) and ReLU for sigma (ensuring non-negativity). Crucially, I only concatenate the direction encoding when predicting color, allowing view-dependent appearance while keeping density view-independent.

### Part 2.5: Volume Rendereing and Lego Dataset
My volrend function implements the discrete volume rendering equation. I compute alpha values as 1 - exp(-sigma * step_size), representing the probability of ray termination at each sample. For transmittance (probability of not terminating before a sample), I use torch.cumsum to compute the cumulative optical depth, subtract the current sample's contribution to get exclusive accumulation, then exponentiate. The weights are transmittance * alphas, and I sum weights * rgbs to get the final color. This implementation passed the provided test with exact numerical precision.


The samples cluster in the near/far range (2.0 to 6.0 meters), ensuring computation focuses on where the object actually is.

#### Results: Lego Dataset

The model progressively learns the 3D structure, first getting rough shapes, then refining details and colors.
I trained for a 1000 iterations with a 10k batch size and a learning rate of 5e-3.


![Lego Orbit GIF](assets/p4/2.5.5.gif)
![Iteration Progression](assets/p4/2.5.1.png)
![Validation PSNR](assets/p4/2.5.2.png)

Validation PSNR steadily increases, reaching ~26 dB after 1000 iterations. The smooth curve indicates good generalization without overfitting.

The trained NeRF successfully renders the Lego bulldozer from novel viewpoints not in the training set, demonstrating true 3D understanding.

# Part 2.6: Training with Your Own Data

For my custom object dataset, I had to make several key adjustments from the Lego scene. I changed near=0.15 and far=0.65 (compared to 2.0 and 6.0 for Lego) because my object was much closer to the camera. I reduced training to 3,000 iterations with batch size 4,096, finding this sufficient for my scene complexity. I kept the learning rate at 5e-3 and maintained 128 samples per ray for quality. I used the same chunk size of 8,192 for rendering full images.

I experimented extensively with different camera trajectory strategies for rendering novel views. My first approach extracted the starting position from my first training camera: start_pos = c2ws_train[0, :3, 3]. I then used the look_at_origin function to create a camera pose pointing toward the scene center.
I tried three different rotation strategies: Y-axis, X-axis, and Z-axis to see what works best for the dataset.
My clockwise_90 function applies a -90° rotation in the camera's local coordinate frame by post-multiplying the rotation matrix with a z-axis rotation matrix. This was necessary because my camera coordinate system wasn't aligned with my desired viewing orientation. 

The most significant challenge was getting the near/far values right. Initially, I might have guessed values similar to Lego, which would have resulted in either sampling empty space (if too far) or clipping the object (if bounds were misplaced). My systematic analysis approach by calculating distances to origin, accounting for ArUco marker size, and visualizing camera distributions was essential for success.

## Dataset

Captured 43 images of an object using an iPhone, with ArUco marker for pose estimation:
- **Training**: 36 images (83%)
- **Validation**: 7 images (17%)


### Novel View Synthesis - Chipotle Bowl

The Hyper Parameters used for this project are:
- Learning Rate: 5e-3
- Batch Size: 4096
- Number of Samples per Ray: 128
- Number of Iterations: 3000
- Near: 0.15
- Far: 0.65
- Chunk Size: 8192

![My Object Orbit GIF](assets/p4/2.6.1.gif)

![Loss and PSNR Curve](assets/p4/2.6.1.png)

You can clearly see the training loss decreasing over the iterations. And the PSNR curve is also increasing over the iterations but pretty low with iterations < 1000.

![Iteration Progression](assets/p4/2.6.2.png)


`
},
{
    "id": "project5",
    "name": "Project 5: Diffusion Models",
    "title": "The Power of Diffusion Models & Flow Matching",
    "content": `

# Overview

This project explores diffusion models in two parts:
- **Part A**: Working with pre-trained diffusion models (DeepFloyd IF)
- **Part B**: Training a flow matching model from scratch on MNIST

# Part A: The Power of Diffusion Models

## Overview
In this first part of the project, I explored the capabilities of diffusion models using the DeepFloyd IF model. This involved playing with pre-trained models, implementing the diffusion sampling loops from scratch, and manipulating the denoising process for creative tasks like inpainting and optical illusions.


## Part 0: Setup and Text Prompts

DeepFloyd IF is a text-to-image model that uses T5 embeddings. To familiarize myself with the model, I generated images using specific text prompts with a fixed random seed of 100.

**Prompts:**
1. *"an oil painting portrait of an old emir holding a cat in his laps"*
2. *"a realistic picture of a cow playing football on the moon"*
3. *"a photo of a monkey ballerina"*

<div align="center">
  <img src="assets/p5/a/0.1.png" width="30%" />
  <img src="assets/p5/a/0.2.png" width="30%" />
  <img src="assets/p5/a/0.3.png" width="30%" />
</div>



# Part 1: Sampling Loops

## 1.1 Implementing the Forward Process

The forward process $q(x_t | x_0) takes a clean image and adds Gaussian noise to it over $t$ timesteps. The amount of noise is scaled by alpha_t, allowing us to simulate the gradual degradation of an image.


![Forward Process](assets/p5/a/1.1.png)

## 1.2 Classical Denoising

I attempted to recover the original image from the noisy versions using Gaussian blur. As expected, classical filtering fails to recover high-frequency details, resulting in blurry images that do not resemble the original sharp Campanile.

![Classical Denoising](assets/p5/a/1.2.png)

## 1.3 One-Step Denoising

Using the pre-trained DeepFloyd UNet, I estimated the noise epsilon in the image and subtracted it to recover an estimate. While better than Gaussian blur, the one-step reconstruction is imperfect and degrades significantly at higher noise levels t=750.


<div style="display:flex; gap:16px; justify-content:flex-start;">
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.3.1.png" height="240">
    <figcaption>t = 250</figcaption>
  </figure>

  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.3.2.png" height="240">
    <figcaption>t = 500</figcaption>
  </figure>

  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.3.3.png" height="240">
    <figcaption>t = 750</figcaption>
  </figure>
</div>



## 1.4 Iterative Denoising

Standard diffusion sampling involves iteratively removing a small amount of noise. To save computational resources, I implemented strided sampling (skipping timesteps). This method slowly refines the image, resulting in a much cleaner output than the one-step approach.

![Iterative Denoising Process](assets/p5/a/1.4.1.png)

<div style="display:flex; gap:8px; align-items:center;">
  <img src="assets/p5/a/1.4.2.1.png" height="200">
  <img src="assets/p5/a/1.4.2.2.png" height="200">
  <img src="assets/p5/a/1.4.2.3.png" height="200">
  <img src="assets/p5/a/1.4.2.4.png" height="200">
  <img src="assets/p5/a/1.4.2.5.png" height="200">
</div>


## 1.5 Diffusion Model Sampling


Using the iterative denoising loop implemented above, I generated images from scratch (starting from pure random noise) using the prompt *"a high quality photo"*. Without guidance, the images are coherent but somewhat dull or nonsensical.


![Diffusion Sampling](assets/p5/a/1.5.png)

## 1.6 Classifier-Free Guidance (CFG)

To improve image quality, I implemented Classifier-Free Guidance. The resulting images are significantly sharper and more detailed.


![CFG Sampling](assets/p5/a/1.6.png)

## 1.7 Image-to-Image Translation



### 1.7.0 SDEdits

By taking a clean image, adding noise to it up to a certain timestep t (forward process), and then running the iterative denoising process from there, we can "edit" the image. The model projects the noisy image back onto the manifold of natural images. Higher starting noise levels allow for more drastic changes.

Here are the results of the SDEdit process at different noise levels.

![SDEdit Results 1](assets/p5/a/1.7.0.1.png)

**Original Image 2:**
![Original](assets/p5/a/1.7.0.2a.jpg)

**SDEdit Results 2:**
![SDEdit Results 2](assets/p5/a/1.7.0.2.png)

**Original Image 3:**
</br>
<img src="assets/p5/a/1.7.0.3a.jpg" width="250">
</br>


**SDEdit Results 3:**
![SDEdit Results 3](assets/p5/a/1.7.0.3.png)

### 1.7.1 Editing Web Images

Here are some results of the editing web images.

<h3>Image 1</h3>
<div style="display:flex; gap:12px;">
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.1/og.png" height="120">
    <figcaption>Original</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.1/1.png" height="120">
    <figcaption>i<sub>start</sub> = 1</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.1/3.png" height="120">
    <figcaption>i<sub>start</sub> = 3</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.1/5.png" height="120">
    <figcaption>i<sub>start</sub> = 5</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.1/7.png" height="120">
    <figcaption>i<sub>start</sub> = 7</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.1/10.png" height="120">
    <figcaption>i<sub>start</sub> = 10</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.1/20.png" height="120">
    <figcaption>i<sub>start</sub> = 20</figcaption>
  </figure>
</div>

<h3>Image 2</h3>
<div style="display:flex; gap:12px;">
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.2/og.png" height="120">
    <figcaption>Original</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.2/1.png" height="120">
    <figcaption>i<sub>start</sub> = 1</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.2/3.png" height="120">
    <figcaption>i<sub>start</sub> = 3</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.2/5.png" height="120">
    <figcaption>i<sub>start</sub> = 5</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.2/7.png" height="120">
    <figcaption>i<sub>start</sub> = 7</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.2/10.png" height="120">
    <figcaption>i<sub>start</sub> = 10</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.2/20.png" height="120">
    <figcaption>i<sub>start</sub> = 20</figcaption>
  </figure>
</div>

<h3>Image 3</h3>
<div style="display:flex; gap:12px;">
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.3/og.png" height="120">
    <figcaption>Original</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.3/1.png" height="120">
    <figcaption>i<sub>start</sub> = 1</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.3/3.png" height="120">
    <figcaption>i<sub>start</sub> = 3</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.3/5.png" height="120">
    <figcaption>i<sub>start</sub> = 5</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.3/7.png" height="120">
    <figcaption>i<sub>start</sub> = 7</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.3/10.png" height="120">
    <figcaption>i<sub>start</sub> = 10</figcaption>
  </figure>
  <figure style="margin:0; text-align:center;">
    <img src="assets/p5/a/1.7.1.3/20.png" height="120">
    <figcaption>i<sub>start</sub> = 20</figcaption>
  </figure>
</div>


### 1.7.2 Inpainting

By modifying the sampling loop, we can perform inpainting. At each step, I enforced the pixels inside a known region (mask = 0) to match the original image (with added noise), while allowing the model to generate new content inside the masked area (mask = 1).

![](assets/p5/a/1.7.2.1.png)
![](assets/p5/a/1.7.2.2.png)
![](assets/p5/a/1.7.2.3.png)

### 1.7.3 Text-Conditional Image-to-image Translation

This is an extension of SDEdit where we provide a specific text prompt to guide the generation, rather than a generic one. 

![](assets/p5/a/1.7.3.1.png)
![](assets/p5/a/1.7.3.2.png)
![](assets/p5/a/1.7.3.3.png)

## 1.8 Visual Anagrams

I implemented an algorithm to create optical illusions. The model denoises an image x_twith prompt A, and simultaneously flips the image, denoises with prompt B, and flips it back. By averaging these noise estimates, we create an image that looks like one thing right-side up and another upside down.

**Prompt 1:** "an oil painting portrait of an old emir holding a cat in his laps"
**Prompt 2:** "a lithograph of a sword fight"

![](assets/p5/a/1.8.1.png)

**Prompt 1:** "a photo of a monkey ballerina"
**Prompt 2:** "a realistic picture of a cow playing football on the moon"

![](assets/p5/a/1.8.2.png)

## 1.9 Hybrid Images

Similar to the visual anagrams, hybrid images are created by combining noise estimates from two different prompts. I used a low-pass filter for one noise estimate and a high-pass filter for the other. This results in an image that looks like one object from afar (low frequency) and another from up close (high frequency).

![](assets/p5/a/1.9.1.png)

![](assets/p5/a/1.9.2.png)



# Part B: Flow Matching from Scratch

# Part 1: Training a Single-Step Denoising UNet


## 1.2 Using the UNet to Train a Denoiser

### Noising Process Visualization

Visualized noising with σ=[0.0, 0.2, 0.4, 0.5, 0.6, 0.8, 1.0].


![Noising Visualization](assets/p5/b/1.2.png)

The visualization demonstrates the forward process where clean MNIST digits are progressively corrupted by Gaussian noise. At 0.0 the image is pristine. As sigma increases, the original signal drowns out; by sigma=1, the image is indistinguishable from pure Gaussian noise.

### 1.2.1 Training

### 1.2.1 Training

**Training Loss Curve:**

![Training Loss](assets/p5/b/1.2.1.1.png)

The model learns relatively quickly. Even after Epoch 1, the UNet successfully identifies high-level structures of the digits, though the edges remain blurry. By Epoch 5, the denoised outputs are slighly sharper, and the model more accurately removes the background 

**Results after Epoch 1:**

![Epoch 1 Results](assets/p5/b/1.2.1.2.png)

**Results after Epoch 5:**

![Epoch 5 Results](assets/p5/b/1.2.1.3.png)

### 1.2.2 Out-of-Distribution Testing

Tested denoiser on varying noise levels.

![OOD Testing](assets/p5/b/1.2.2.png)

The model seems to geeneralize poorly to higher noise levels, leaving significant graininess and artifacts.

### 1.2.3 Denoising Pure Noise

**Training Loss Curve:**

![Pure Noise Training Loss](assets/p5/b/1.2.3.1.png)

**Results after Epoch 1:**

![Pure Noise Epoch 1](assets/p5/b/1.2.3.2.png)

**Results after Epoch 5:**

![Pure Noise Epoch 5](assets/p5/b/1.2.3.3.png)

This clearly shows that a single-step denoiser is **not** a generative model. When fed pure noise, the model produces blurry "average" images or ghostly blobs that vaguely resemble digits but lack coherence. It maps the noise to the manifold of "clean digits" in a single jump, which results in the mean of the posterior distribution rather than a specific sample.

From research, I understand that this happens because the model optimizes an **MSE loss**. Minimizing MSE forces the model to predict the mean of the posterior distribution given the input. When the input is pure noise (which contains no information about the specific digit), the optimal prediction minimizing the sum of squared distances to all possible training images is the average of all digits (that's what the model is doing).

# Part 2: Training a Flow Matching Model

## 2.2 Training the UNet

**Training Loss Curve:**

![Time-Conditioned Training Loss](assets/p5/b/2.2.png)

## 2.3 Sampling from the UNet

**Epoch 1:**

![Sampling Epoch 1](assets/p5/b/2.3.1.png)

**Epoch 5:**

![Sampling Epoch 5](assets/p5/b/2.3.2.png)

**Epoch 10:**

![Sampling Epoch 10](assets/p5/b/2.3.3.png)



## 2.5 Training the UNet

**Training Loss Curve:**

![Class-Conditioned Training Loss](assets/p5/b/2.5.png)

## 2.6 Sampling from the UNet

**Epoch 1:**

![Class-Conditioned Epoch 1](assets/p5/b/2.6.1.1.png)

**Epoch 5:**

![Class-Conditioned Epoch 5](assets/p5/b/2.6.1.2.png)

**Epoch 10:**

![Class-Conditioned Epoch 10](assets/p5/b/2.6.1.3.png)

**Without Learning Rate Scheduler:**

To compensate for the removal of the exponential learning rate scheduler, I lowered the learning rate by an order of magnitude, from the initial 1e-2 used in the scheduled run to a constant 1e-3.

The scheduled run starts with a high learning rate 1e-2 to escape local minima quickly and then decays to refine details. Without the scheduler, starting at 1e-2 would cause the optimization to oscillate violently around the minimum. A constant 1e-3 provides stable convergence but lacks the efficiency of the "warm-up and cool-down" strategy.

Hence, the final images are comparable but slightly noisier. The loss curve is generally smoother but converges more slowly compared to the aggressive initial drop seen in the scheduled run.
![Without LR Scheduler](assets/p5/b/2.6.2.png)

`
}

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
