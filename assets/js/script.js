// Chart initialization
document.addEventListener('DOMContentLoaded', function() {
    // Chart data configurations
    const chartConfigs = [
        {
            id: 'athletesChart1',
            title: 'Athletes',
            data: [79, 12.4, 8.7],
            centerText: '114'
        },
        {
            id: 'athletesChart2',
            title: 'Coaches',
            data: [62.5, 25, 12.5],
            centerText: '7'
        },
        {
            id: 'athletesChart3',
            title: 'Other',
            data: [38.5, 53.8, 7.7],
            centerText: '39'
        }
    ];

    // Create charts
    chartConfigs.forEach(config => {
        const ctx = document.getElementById(config.id).getContext('2d');

        // Create the donut chart
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Compliant', 'Non-Compliant', 'Approaching Non-Compliance'],
                datasets: [{
                    data: config.data,
                    backgroundColor: [
                        '#00234F', // Blue for Compliant
                        '#A82F45', // Dark red for Non-Compliant
                        '#DE4E34', // Orange for Approaching Non-Compliance
                    ],
                    borderWidth: 0,
                    cutout: '70%'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                },
                layout: {
                    padding: 20
                },
                rotation: -90 * Math.PI / 180, // Start from top
            },
            plugins: [{
                id: 'centerText',
                beforeDraw: function(chart) {
                    const width = chart.width;
                    const height = chart.height;
                    const ctx = chart.ctx;
                    
                    ctx.restore();
                    const fontSize = (height / 114).toFixed(2);
                    ctx.font = fontSize + "em sans-serif";
                    ctx.textBaseline = "middle";
                    
                    const text = config.centerText;
                    const textX = Math.round((width - ctx.measureText(text).width) / 2);
                    const textY = height / 2;
                    
                    ctx.fillStyle = '#00234F';
                    ctx.fillText(text, textX, textY);
                    ctx.save();
                }
            }]
        });
    });
});

// Initialize all tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('#rowing-tabs .nav-link');
    const tabContents = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all tabs and content
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => {
                content.classList.remove('show', 'active');
            });
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const targetId = tab.getAttribute('href');
            const targetContent = document.querySelector(targetId);
            targetContent.classList.add('show', 'active');
        });
    });
});

// Roster Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const rosterTabs = document.querySelectorAll('.roster-tab');
    const rosterContents = document.querySelectorAll('.roster-tab-content');

    // Hide all content except the first one
    rosterContents.forEach((content, index) => {
        if (index !== 0) {
            content.style.display = 'none';
        }
    });

    rosterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            rosterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all content
            rosterContents.forEach(content => {
                content.style.display = 'none';
            });

            // Show corresponding content
            const targetTab = tab.getAttribute('data-tab');
            const targetContent = document.getElementById(`${targetTab}-content`);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });
});
