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


`
            }
        ];

        console.log(`✅ Loaded ${this.projects.length} projects for GitHub Pages`);
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

        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Bold and Italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Images ![alt](src)
        html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<div class="image-wrapper"><img src="$2" alt="$1" class="markdown-image"><p class="image-caption">$1</p></div>');

        // Links [text](url)
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

        // Inline code `code`
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Lists
        const lines = html.split('\n');
        let inList = false;
        let inOrderedList = false;
        const result = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Ordered list
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
                
                // Paragraphs
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
