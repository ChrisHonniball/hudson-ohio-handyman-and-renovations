import './scss/app.scss'

window.roundNearest = function(num, nearest = 5) {
  return Math.round(num / nearest) * nearest;
}

window.calculatePricing = function(basePrice = .07, round = 5){
  let calc = roundNearest(parseInt(document.getElementById('calc').value), 100);
  if(calc < 1500) calc = 1500;
  const photoCostPer = basePrice;
  const videoCostPer = photoCostPer + .04;
  const costs = {
    photo: `$${roundNearest(photoCostPer * calc, round)}`,
    video: `$${roundNearest(videoCostPer * calc, round)}`,
    bundle: `$${roundNearest(((photoCostPer + videoCostPer) * calc) * .85, round)}`,
  };
  if(window.location.hostname === 'localhost') console.table(costs);
  Object.keys(costs).forEach(k => {
    const el = document.getElementById(`pricing-${k}`)
    if(el){
      el.innerHTML = (calc <= 5000)
        ? costs[k]
        : 'Call Me';
    } else {
      console.error('Unable to find element "pricing-%s" to update...', k);
    }
  });
}

window.calculateCommercialPricing = function(){
  let acreage = parseInt(document.getElementById('acreage').value);
  if(acreage < 1) acreage = 1;
  const acreageSqft = acreage * 43560;

  let interiorSqft = parseInt(document.getElementById('interior-sqft').value);
  if(interiorSqft < 2500) interiorSqft = 2500;
  interiorSqft = roundNearest(interiorSqft, 100);

  const exteriorBase = .27 * (acreageSqft / 18);
  const interiorBase = .30 * interiorSqft;
  const round = 25;

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  const costs = {
    'exterior-camera-photo': roundNearest(exteriorBase, round),
    'interior-camera-photo': roundNearest(interiorBase, round),
    'exterior-drone-photo': roundNearest(exteriorBase * 1.1, round),
    'interior-drone-photo': roundNearest(interiorBase * 1.1, round),
    'interior-fpv-video': roundNearest(interiorBase *1.4, round),

    'exterior-camera-video': roundNearest(exteriorBase * 1.15, round),
    'interior-camera-video': roundNearest(interiorBase * 1.15, round),
    'exterior-drone-video': roundNearest(exteriorBase * 1.25, round),
    'interior-drone-video': roundNearest(interiorBase * 1.25, round),
    'exterior-fpv-video': roundNearest(exteriorBase *1.4, round),

    'orthomosaic-mapping': roundNearest(exteriorBase * 1.75, round),
  };
  if(window.location.hostname === 'localhost') console.table(costs);
  Object.keys(costs).forEach(k => {
    const el = document.getElementById(`pricing-${k}`)
    if(el){
      el.innerHTML = formatter.format(costs[k]);
    } else {
      console.error('Unable to find element "pricing-%s" to update...', k);
    }
  });
}
