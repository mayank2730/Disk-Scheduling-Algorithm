// Disk Scheduling Algorithms

function fcfs(requests, head) {
    return [head, ...requests];
}

function sstf(requests, head) {
    let seekSequence = [head];
    let remainingRequests = [...requests];

    while (remainingRequests.length) {
        let closestRequest = remainingRequests.reduce((a, b) =>
            Math.abs(a - head) < Math.abs(b - head) ? a : b
        );
        seekSequence.push(closestRequest);
        head = closestRequest;
        remainingRequests = remainingRequests.filter(r => r !== closestRequest);
    }

    return seekSequence;
}

function scan(requests, head, diskSize, direction) {
    requests.push(0, diskSize - 1);
    requests.sort((a, b) => a - b);

    let left = requests.filter(r => r <= head);
    let right = requests.filter(r => r > head);

    return direction === 'left'
        ? [...left.reverse(), ...right]
        : [...right, ...left.reverse()];
}

function cscan(requests, head, diskSize) {
    requests.push(0, diskSize - 1);
    requests.sort((a, b) => a - b);

    let right = requests.filter(r => r >= head);
    let left = requests.filter(r => r < head);

    return [...right, ...left];
}

function look(requests, head, direction) {
    requests.sort((a, b) => a - b);

    let left = requests.filter(r => r <= head);
    let right = requests.filter(r => r > head);

    return direction === 'left'
        ? [...left.reverse(), ...right]
        : [...right, ...left.reverse()];
}

function clook(requests, head) {
    requests.sort((a, b) => a - b);

    let right = requests.filter(r => r >= head);
    let left = requests.filter(r => r < head);

    return [...right, ...left];
}

// Function to plot the graph using Chart.js
function plotGraph(seekSequence, title) {
    const ctx = document.getElementById('diskChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: seekSequence,
            datasets: [{
                label: title,
                data: seekSequence,
                borderColor: 'blue',
                fill: false,
                tension: 0.1,
                pointRadius: 5,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                tooltip: { enabled: true }
            },
            scales: {
                x: { title: { display: true, text: 'Cylinder Number' } },
                y: { title: { display: true, text: 'Seek Sequence' } }
            }
        }
    });
}

// Main function to get user input and run the algorithms
function runAlgorithm() {
    const diskSize = parseInt(document.getElementById('diskSize').value);
    const head = parseInt(document.getElementById('headPosition').value);
    const requests = document.getElementById('requests').value
        .split(' ')
        .map(Number);
    const algorithm = document.getElementById('algorithm').value;
    const direction = document.getElementById('direction').value.toLowerCase();

    let seekSequence;

    switch (algorithm) {
        case 'fcfs':
            seekSequence = fcfs(requests, head);
            plotGraph(seekSequence, 'FCFS Disk Scheduling');
            break;
        case 'sstf':
            seekSequence = sstf(requests, head);
            plotGraph(seekSequence, 'SSTF Disk Scheduling');
            break;
        case 'scan':
            seekSequence = scan(requests, head, diskSize, direction);
            plotGraph(seekSequence, 'SCAN Disk Scheduling');
            break;
        case 'cscan':
            seekSequence = cscan(requests, head, diskSize);
            plotGraph(seekSequence, 'C-SCAN Disk Scheduling');
            break;
        case 'look':
            seekSequence = look(requests, head, direction);
            plotGraph(seekSequence, 'LOOK Disk Scheduling');
            break;
        case 'clook':
            seekSequence = clook(requests, head);
            plotGraph(seekSequence, 'C-LOOK Disk Scheduling');
            break;
        default:
            alert('Invalid choice!');
    }
}
