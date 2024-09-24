document.addEventListener('DOMContentLoaded', function () {
    // Function to toggle visibility with fixed max-height
    function toggleElementVisibility(button, target, maxHeight = '750px') { // Use your fixed height here
        button.addEventListener('click', function () {
            const element = document.querySelector(target);
            const isVisible = element.style.maxHeight && element.style.maxHeight !== '0px';

            if (isVisible) {
                // Collapse the element
                element.style.maxHeight = '0';
                setTimeout(() => {
                    element.style.display = 'none'; // Hide after transition
                }, 500); // Match the CSS transition duration
            } else {
                element.style.display = 'block'; // Show element
                setTimeout(() => {
                    element.style.maxHeight = maxHeight; // Set to fixed height
                }, 10); // Small delay to apply max-height after display change
            }
        });
    }

    // Apply the function to all buttons with a specific class
    document.querySelectorAll('.toggle-code-button, .toggle-table-button').forEach(button => {
        const target = button.dataset.target;
        toggleElementVisibility(button, target, '750px'); // Set fixed height as desired
    });

    // Function to fetch and display CSV data
    function fetchAndDisplayCSV(csvUrl, tableId) {
        Papa.parse(csvUrl, {
            download: true,
            delimiter: ';',
            complete: function (results) {
                const table = document.getElementById(tableId);
                const thead = table.querySelector('thead');
                const tbody = table.querySelector('tbody');

                // Clear the table first
                thead.innerHTML = '';
                tbody.innerHTML = '';

                // Add headers to the table
                const headers = results.data[0];
                const headerRow = thead.insertRow();
                headers.forEach(header => {
                    const th = document.createElement('th');
                    th.textContent = header;
                    headerRow.appendChild(th);
                });

                // Add data to the table
                for (let i = 1; i < results.data.length; i++) {
                    const row = tbody.insertRow();
                    results.data[i].forEach(cell => {
                        const td = document.createElement('td');
                        td.textContent = cell;
                        row.appendChild(td);
                    });
                }
            }
        });
    }

    // Lazy load CSV when table button is clicked
    const csvMappings = {
        'table1': 'assets/csv/HOUSES/DUPLICATES.csv',
        'table2': 'assets/csv/HOUSES/DUPLICATES-2.csv',
        'table3': 'assets/csv/HOUSES/FORMATTING_RES_DATE.csv',
        'table4': 'assets/csv/HOUSES/sold-sold_at.csv',
        'table5': 'assets/csv/HOUSES/Book1.csv',
        'table6': 'assets/csv/HOUSES/regional_price.csv',
        'table7': 'assets/csv/HOUSES/neighborhoods_.csv',
        'table8': 'assets/csv/HOUSES/PRICE_DISTRIBUTION.csv',
        'table9': 'assets/csv/HOUSES/heating.csv',
        'table10': 'assets/csv/HOUSES/TIME_TO_SELL.csv',
        'table11': 'assets/csv/HOUSES/sold_houses.csv',
        'table12': 'assets/csv/HOUSES/residuals.csv',
        'table13': 'assets/csv/HOUSES/coefficients.csv',
    };

    Object.entries(csvMappings).forEach(([tableId, csvUrl]) => {
        const button = document.querySelector(`button[data-target="#${tableId}-wrapper"]`);
        if (button) {
            button.addEventListener('click', function () {
                const tableWrapper = document.getElementById(`${tableId}-wrapper`);
                if (!tableWrapper.dataset.loaded) {
                    fetchAndDisplayCSV(csvUrl, tableId);
                    tableWrapper.dataset.loaded = 'true'; // Mark as loaded
                }
            });
        }
    });
});
