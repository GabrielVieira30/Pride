// Form validation and interaction
document.getElementById('bet-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const event = document.getElementById('event').value;
    const betType = document.getElementById('bet-type').value;
    const amount = document.getElementById('amount').value;

    // Basic validation
    if (!event || !betType || !amount) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (amount < 1) {
        alert('O valor da aposta deve ser maior que zero.');
        return;
    }

    // Calculate potential winnings
    const odds = getOdds(event, betType);
    if (!odds) {
        alert('Não foi possível encontrar as odds para esta aposta.');
        return;
    }

    const potentialWin = (amount * odds).toFixed(2);
    
    // Show confirmation
    if (confirm(`Você está prestes a apostar R$${amount} com odds de ${odds}. Ganho potencial: R$${potentialWin}. Confirmar?`)) {
        // Here you would normally send the bet to the server
        alert('Aposta confirmada! Boa sorte!');
        // Reset form
        this.reset();
    }
});

// Mock odds data
function getOdds(event, betType) {
    const oddsData = {
        'futebol': {
            'vitoria': 2.10,
            'empate': 3.25,
            'placar': 4.50
        },
        'basquete': {
            'vitoria': 1.80,
            'placar': 3.00
        },
        'tenis': {
            'vitoria': 1.95,
            'placar': 3.50
        }
    };

    return oddsData[event]?.[betType] || null;
}

// Update odds display
function updateOddsDisplay() {
    const oddsContainer = document.querySelector('.odds-container');
    oddsContainer.innerHTML = `
        <div class="odds-item">
            <h3>Futebol: Brasil x Argentina</h3>
            <ul>
                <li>Brasil: 2.10</li>
                <li>Empate: 3.25</li>
                <li>Argentina: 3.00</li>
            </ul>
        </div>
        <div class="odds-item">
            <h3>Basquete: Lakers x Warriors</h3>
            <ul>
                <li>Lakers: 1.80</li>
                <li>Warriors: 2.00</li>
            </ul>
        </div>
    `;
}

// Result simulation
function simulateResult(event) {
    const results = {
        'futebol': ['Brasil 2-1 Argentina', 'Empate 0-0', 'Argentina 1-0 Brasil'],
        'basquete': ['Lakers 110-105 Warriors', 'Warriors 120-115 Lakers'],
        'tenis': ['Nadal 3-2 Djokovic', 'Djokovic 3-1 Nadal']
    };
    
    const randomIndex = Math.floor(Math.random() * results[event].length);
    return results[event][randomIndex];
}

// Add result simulation button
function addSimulationButton() {
    const betSection = document.querySelector('.bet-section');
    const simulateBtn = document.createElement('button');
    simulateBtn.id = 'simulate-btn';
    simulateBtn.textContent = 'Simular Resultado';
    simulateBtn.style.marginLeft = '10px';
    simulateBtn.style.backgroundColor = '#3498db';
    
    simulateBtn.addEventListener('click', function() {
        const event = document.getElementById('event').value;
        if (!event) {
            alert('Selecione um evento primeiro.');
            return;
        }
        
        const result = simulateResult(event);
        alert(`Resultado simulado: ${result}`);
    });
    
    betSection.appendChild(simulateBtn);
}

// Account balance management
let accountBalance = 1000.00;

function updateBalanceDisplay() {
    document.getElementById('balance').textContent = accountBalance.toFixed(2);
}

function addFunds(amount) {
    accountBalance += amount;
    updateBalanceDisplay();
    alert(`Adicionado R$${amount.toFixed(2)} ao saldo. Novo saldo: R$${accountBalance.toFixed(2)}`);
}

// Add funds button handler
document.getElementById('add-funds').addEventListener('click', function() {
    const amount = parseFloat(prompt('Digite o valor que deseja adicionar:'));
    if (!isNaN(amount) && amount > 0) {
        addFunds(amount);
    } else {
        alert('Por favor, insira um valor válido.');
    }
});

// Update bet form validation
document.getElementById('bet-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const event = document.getElementById('event').value;
    const betType = document.getElementById('bet-type').value;
    const amount = parseFloat(document.getElementById('amount').value);

    // Validate balance
    if (amount > accountBalance) {
        alert('Saldo insuficiente para realizar esta aposta.');
        return;
    }

    // Calculate potential winnings
    const odds = getOdds(event, betType);
    if (!odds) {
        alert('Não foi possível encontrar as odds para esta aposta.');
        return;
    }

    const potentialWin = (amount * odds).toFixed(2);
    
    // Show confirmation
    if (confirm(`Você está prestes a apostar R$${amount} com odds de ${odds}. Ganho potencial: R$${potentialWin}. Confirmar?`)) {
        accountBalance -= amount;
        updateBalanceDisplay();
        alert('Aposta confirmada! Boa sorte!');
        // Reset form
        this.reset();
    }
});

// Tab Switching Functionality
function switchTab(tabId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const activeSection = document.getElementById(tabId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Update active tab style
    document.querySelectorAll('.tab-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
}

// Add tab click handlers
document.querySelectorAll('.tab-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const tabId = this.getAttribute('data-tab');
        switchTab(tabId);
    });
});

// Handle initial tab based on URL hash
function handleInitialTab() {
    const hash = window.location.hash;
    const defaultTab = 'home';
    const tabId = hash ? hash.substring(1) : defaultTab;
    
    // Validate tab exists
    if (document.getElementById(tabId)) {
        switchTab(tabId);
    } else {
        switchTab(defaultTab);
    }
}

// Initial setup
updateOddsDisplay();
addSimulationButton();
updateBalanceDisplay();
handleInitialTab();
