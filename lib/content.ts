import { z } from 'zod';
export const categories = ['Maintenance', 'Diagnostics', 'Brakes & suspension', 'Engine & transmission', 'EV & hybrid'] as const;
const short = z.string().trim().min(1).max(180);
const image = z.string().max(300).refine(v => /^\/assets\/[a-zA-Z0-9._-]+$/.test(v) || /^\/api\/image\/[a-zA-Z0-9._-]+$/.test(v), 'Upload an image to use it here.');
export const priceSchema = z.object({ id: short, title: short, category: z.enum(categories), price: z.number().min(0).max(100000), description: z.string().max(500), duration: short, included: z.string().max(800), featured: z.boolean(), image: image.optional() });
export const projectSchema = z.object({ id: short, title: short, vehicle: short, category: z.enum(categories), image, description: z.string().max(1500), result: z.string().max(800), gallery: z.array(image).max(12) });
export const contentSchema = z.object({ prices: z.array(priceSchema).max(100), projects: z.array(projectSchema).max(100), shop: z.object({ name: short, phone: z.string().max(40), email: z.string().email().max(180), address: z.string().max(250), city: short, hours: z.string().max(150), intro: z.string().max(600) }) });
export type Price = z.infer<typeof priceSchema>;
export function priceImage(p: Price): string {
  if(p.image) return p.image;
  const byId: Record<string,string>={oil:'oil',inspection:'workshop',aircon:'aircon',scan:'engine',electrical:'engine',brakes:'brakes',discs:'brakes',alignment:'alignment',engine:'engine',transmission:'engine',ev:'ev',hybrid:'ev'};
  const byCategory:Record<string,string>={'Maintenance':'oil','Diagnostics':'engine','Brakes & suspension':'brakes','Engine & transmission':'engine','EV & hybrid':'ev'};
  return '/assets/'+(byId[p.id]||byCategory[p.category]||'workshop')+'.webp';
}
export type Project = z.infer<typeof projectSchema>;
export type SiteContent = z.infer<typeof contentSchema>;
export const initialContent: SiteContent = {
shop: {name: 'Vector Motorworks', phone: '+49 208 555 0120', email: 'hello@vector-motorworks.example', address: 'Workshop address to be confirmed', city: 'Mülheim an der Ruhr', hours: 'Mon–Fri 08:00–18:00 · Sat by appointment', intro: 'Independent expertise. Clear estimates. A workshop that puts you in the driving seat.'},
prices: [
{id:'oil',image:'/assets/oil.webp',title:'Oil & filter service',category:'Maintenance',price:89,description:'Fresh oil. A healthier engine. One less thing to worry about.',duration:'45–60 min',included:'Engine oil up to 5 litres · Oil filter · Fluid level check · Service reset',featured:true},
{id:'inspection',image:'/assets/workshop.webp',title:'Annual vehicle service',category:'Maintenance',price:179,description:'A thorough check for the miles ahead.',duration:'1.5–2 hours',included:'Vehicle inspection · Oil & filter service · Brake check · Written condition report',featured:true},
{id:'aircon',image:'/assets/aircon.webp',title:'Air conditioning service',category:'Maintenance',price:99,description:'Restore comfortable, efficient cooling.',duration:'60–90 min',included:'Leak check · System performance test · Refrigerant quoted separately',featured:false},
{id:'scan',image:'/assets/engine.webp',title:'Diagnostic assessment',category:'Diagnostics',price:59,description:'Understand the warning light before replacing parts.',duration:'30–60 min',included:'Fault-code scan · Initial investigation · Findings explained · Repair estimate',featured:true},
{id:'electrical',image:'/assets/engine.webp',title:'Electrical fault finding',category:'Diagnostics',price:95,description:'A methodical approach to intermittent faults.',duration:'Initial 60 min',included:'Circuit testing · Battery & charging check · Further time agreed in advance',featured:false},
{id:'brakes',image:'/assets/brakes.webp',title:'Brake pads replacement',category:'Brakes & suspension',price:149,description:'Confident stopping, carefully fitted.',duration:'1–2 hours',included:'Pads for one axle · Labour · Brake inspection · Road test',featured:true},
{id:'discs',image:'/assets/brakes.webp',title:'Discs & pads package',category:'Brakes & suspension',price:289,description:'Refresh the complete braking surface.',duration:'2–3 hours',included:'Discs & pads for one axle · Labour · Road test',featured:false},
{id:'alignment',image:'/assets/alignment.webp',title:'Wheel alignment',category:'Brakes & suspension',price:79,description:'Straight tracking. More even tyre wear.',duration:'45–60 min',included:'Geometry measurement · Adjustment · Before & after report',featured:false},
{id:'engine',image:'/assets/engine.webp',title:'Engine repair assessment',category:'Engine & transmission',price:119,description:'A clear plan for a complex repair.',duration:'Initial 60–90 min',included:'Initial mechanical tests · Findings · Itemised repair proposal',featured:false},
{id:'transmission',image:'/assets/engine.webp',title:'Transmission service',category:'Engine & transmission',price:249,description:'Keep gear changes smooth and predictable.',duration:'2–3 hours',included:'Fluid service · Condition inspection · Specification check',featured:false},
{id:'ev',image:'/assets/ev.webp',title:'EV health check',category:'EV & hybrid',price:79,description:'Purpose-built checks for electric driving.',duration:'45–60 min',included:'Battery health scan · Charging system check · Visual inspection',featured:false},
{id:'hybrid',image:'/assets/ev.webp',title:'Hybrid vehicle service',category:'EV & hybrid',price:199,description:'Care for both sides of your powertrain.',duration:'1.5–2 hours',included:'Engine service · Hybrid-system scan · Battery condition report',featured:false}
],
projects:[
{id:'golf',title:'Stopping power, restored.',vehicle:'Volkswagen Golf GTI',category:'Brakes & suspension',image:'/assets/brakes.webp',description:'A complete front brake refresh, from worn discs to carefully fitted replacement components.',result:'New discs and pads, checked calipers and a final road test.',gallery:['/assets/workshop.webp']},
{id:'bmw',title:'An engine running right.',vehicle:'BMW 3 Series',category:'Engine & transmission',image:'/assets/engine.webp',description:'Investigation of rough idle and reduced performance using a diagnostic-led approach.',result:'Ignition fault identified, faulty components replaced and smooth running restored.',gallery:['/assets/workshop.webp']},
{id:'ev-project',title:'Ready for the next charge.',vehicle:'Electric vehicle',category:'EV & hybrid',image:'/assets/workshop.webp',description:'A scheduled electric vehicle health inspection with charging-system checks.',result:'Battery condition documented and charging operation checked.',gallery:[]},
{id:'service-project',title:'The everyday, done properly.',vehicle:'Audi A4',category:'Maintenance',image:'/assets/engine.webp',description:'An annual service and condition inspection before a long-distance trip.',result:'Fluids and filters refreshed, service reset completed and condition report supplied.',gallery:[]}
]};
export const money=(n:number)=>new Intl.NumberFormat('en-IE',{style:'currency',currency:'EUR',minimumFractionDigits:0,maximumFractionDigits:2}).format(n);
