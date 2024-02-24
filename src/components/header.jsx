
const Header =({acts}) => {
    const pct = acts.length > 0 ? 100 - ((acts[0] / 600) * 100) : 0;
    const formattedPct = pct.toFixed(2); 
    return (
    <div class='hero min-h-screen bg-cover bg-[linear-gradient(180deg,rgba(236,227,202,0.5),rgba(236,227,202,1)_95%),url("/images/weathertop.jpg")] flex flex-col justify-between'>
    <div class="flex-grow flex items-center">
        <div class="hero-content text-center flex-grow">
            <div class="max-w-md mx-auto">
                <h1 class="text-5xl font-bold">Veien te <s>600</s></h1>
                <h1 class="text-5xl font-bold">Mount Doom!</h1>
                <h2 class="py-6">Vi slår leir på <a href="#mordor" class="btn btn-secondary btn-sm">Weathertop</a> !</h2>
            </div>
        </div>
    </div>
<div class="flex justify-center gap-4 mb-8 px-4 pb-10 max-w-screen">
    
     <div class="card w-1/2 bg-base-200 shadow-xl bg-opacity-50 backdrop-blur-sm">
            <a href="#month" class="card-body text-center items-center">
                <h2 class="card-title text-center">Måneden</h2>
                    <div className="text-2xl font-bold">{acts[1]}<font class="text-lg text-gray-800">/50</font></div>
                    <p className="text-xs text-muted-foreground">
                      <font class="text-s font-bold">{acts[2]}</font> forrige mnd
                    </p>
            </a>
        </div>

        <div class="card w-1/2 bg-base-200 shadow-xl  bg-opacity-50 backdrop-blur-sm">
        <a href="#year" class="card-body text-center items-center">
                <h2 class="card-title text-center">Året</h2>
                    <div className="text-2xl font-bold">{acts[0]}<font class="text-lg text-gray-800">/600</font></div>
                    <p className="text-xs text-muted-foreground">
                      <font class="text-s font-bold">{formattedPct}%</font> igjen te Mount Doom 
                    </p>
            </a>
        </div>

{/*         <div class="card w-auto bg-base-200 shadow-xl">
        <div class="card-body">
                <h2 class="card-title">Denne Mnd</h2>
                    <div className="text-2xl font-bold">30/45</div>
                    <p className="text-xs text-muted-foreground">
                      30 forrige mnd
                    </p>
            </div>
        </div> */}
    </div>
</div>

)}

    export default Header;
