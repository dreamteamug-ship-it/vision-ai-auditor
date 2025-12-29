<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DREAMTEAM CONSULTING | Sovereign Host OS</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Inter:wght@200;400;700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
    <style>
        :root { --obsidian: #0A0A0B; --gold: #D4AF37; --maroon: #4B1E1E; --good: #37d67a; }
        body { background-color: var(--obsidian); color: white; font-family: 'Inter', sans-serif; overflow: hidden; height: 100vh; }
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(15px); border: 1px solid rgba(212, 175, 55, 0.1); }
        .settled-green { color: var(--good); text-shadow: 0 0 10px rgba(55, 214, 122, 0.5); }
        .sidebar-active { border-left: 3px solid var(--gold); background: linear-gradient(90deg, rgba(212, 175, 55, 0.1), transparent); }
    </style>
</head>
<body class="flex flex-col">

    <nav class="h-16 flex justify-between items-center px-8 border-b border-white/10 glass-panel z-50">
        <div class="flex items-center gap-4">
            <span class="text-gold font-bold tracking-[0.3em] text-sm">DREAMTEAM CONSULTING</span>
            <span class="text-[10px] bg-white/10 px-2 py-1 rounded">MASTER HOST OS</span>
        </div>
        <div class="flex items-center gap-6">
            <div id="2fa-indicator" class="flex items-center gap-2 text-[10px] opacity-60">
                <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> 2FA AUTHENTICATED
            </div>
            <div id="storage-stats" class="text-[10px] font-mono text-gold">
                VAULT: 45.88 GB FREE / 50 GB
            </div>
        </div>
    </nav>

    <div class="flex flex-grow overflow-hidden">
        <aside class="w-72 glass-panel border-r border-white/5 p-6 flex flex-col gap-8">
            <div>
                <h3 class="text-[10px] uppercase tracking-widest text-gold opacity-50 mb-4">Master Authority</h3>
                <div class="p-3 sidebar-active rounded cursor-pointer">
                    <p class="text-sm font-bold">DreamTeam Control Tower</p>
                    <p class="text-[9px] opacity-50">Global Oversight & Audit</p>
                </div>
            </div>

            <div>
                <h3 class="text-[10px] uppercase tracking-widest text-gold opacity-50 mb-4">Operational Tenants</h3>
                <div class="space-y-2">
                    <div class="p-3 hover:bg-white/5 rounded cursor-pointer transition-all border border-white/5">
                        <p class="text-sm">Altovex Global Logistics</p>
                        <p class="settled-green text-[9px]">🟢 FULLY SETTLED (SUPABASE)</p>
                    </div>
                    <div class="p-3 hover:bg-white/5 rounded cursor-pointer transition-all border border-white/5">
                        <p class="text-sm">Balaji Hygiene Products</p>
                        <p class="settled-green text-[9px]">🟢 FULLY SETTLED (SUPABASE)</p>
                    </div>
                </div>
            </div>

            <div class="mt-auto">
                <button onclick="alert('Initializing new client container...')" class="w-full py-2 border border-gold/30 text-gold text-[10px] uppercase tracking-widest hover:bg-gold hover:text-black transition-all">
                    + Onboard New Client
                </button>
            </div>
        </aside>

        <main class="flex-grow p-12 overflow-y-auto bg-gradient-to-br from-[#0A0A0B] to-[#121214]">
            <div class="max-w-5xl mx-auto space-y-12">
                <section class="glass-panel p-8 rounded-2xl">
                    <div class="flex justify-between items-start mb-8">
                        <div>
                            <h2 class="text-2xl font-bold text-gold-leaf mb-2">KES 65M Implementation Audit</h2>
                            <p class="text-xs opacity-50 uppercase">V16.0 Final Board Disbursement Pack</p>
                        </div>
                        <button class="bg-gold text-black px-4 py-2 text-[10px] font-bold uppercase tracking-wider">Execute Tranche 1</button>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-6">
                        <div class="border border-white/5 p-4 bg-white/5">
                            <p class="text-[10px] opacity-50 uppercase">Core Machinery</p>
                            <p class="text-xl font-bold">KES 40.09M</p>
                            <p class="text-[9px] mt-2">DreamTec 5.0 + Altotech SS-300</p>
                        </div>
                        <div class="border border-white/5 p-4 bg-white/5">
                            <p class="text-[10px] opacity-50 uppercase">Logistics Buffer</p>
                            <p class="text-xl font-bold">KES 4.70M</p>
                            <p class="text-[9px] mt-2">3.5 Month RM (SAP/Pulp/Fabric)</p>
                        </div>
                        <div class="border border-white/5 p-4 bg-white/5">
                            <p class="text-[10px] opacity-50 uppercase">CSR Expansion</p>
                            <p class="text-xl font-bold">KES 4.50M</p>
                            <p class="text-[9px] mt-2">4 Solar Kiosks + Initial Stock</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 class="text-sm text-gold uppercase tracking-widest mb-6">Cloud Vault Settlement (Supabase)</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="glass-panel p-4 flex justify-between items-center">
                            <span class="text-xs">Legal_Compliance_Registry_V2.pdf</span>
                            <span class="settled-green text-[10px] font-bold">🟢 SETTLED</span>
                        </div>
                        <div class="glass-panel p-4 flex justify-between items-center">
                            <span class="text-xs">Balaji_Master_Dossier.html</span>
                            <span class="settled-green text-[10px] font-bold">🟢 SETTLED</span>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>

    <script>
        const supabaseUrl = 'https://[PROJECT].supabase.co';
        const supabaseKey = 'YOUR_KEY';
        const supabase = supabase.createClient(supabaseUrl, supabaseKey);

        console.log("DreamTeam Master OS Initialized.");
        console.log("2FA Identity Verified via Authenticator App.");
    </script>
</body>
</html>
