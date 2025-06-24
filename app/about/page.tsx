// export const metadata = {
//   title: 'About DeepDigiDive',
// }

// import { Button } from '@/components/ui/button'

// export default function AboutPage() {
//   return (
//     <section className="bg-[#0b0815] px-6 py-20 text-white">
//       <div className="max-w-5xl mx-auto space-y-8">
//         <h1 className="text-4xl font-heading font-bold text-yellow-300 text-center">About DeepDigiDive</h1>
//         <p className="text-purple-300 text-center">You’re not early. You’re just paying closer attention than most.</p>
//         <div className="space-y-6">
//           <p className="text-purple-200">DeepDigiDive is not a brand. It’s a frequency—a pulse beneath the creator economy, the AI boom, the faceless empire movement.</p>
//           <p className="text-purple-200">We build creators. We build systems. We build in silence.</p>
//           <ul className="list-disc pl-5 text-purple-200 space-y-2">
//             <li>Cinematic content — short-form built like trailers</li>
//             <li>AI workflows — prompt engineering and automation</li>
//             <li>Web assets — faceless websites, microbrands, productized funnels</li>
//             <li>Mentorship — training the next 100 killers in this space by 2030</li>
//           </ul>
//           <p className="text-purple-200">We don’t just post. We architect timelines.</p>
//           <p className="text-purple-200">By 2030 I’ll reveal the full blueprint. Until then we’re stacking wins silently, systematically, successfully.</p>
//         </div>
//         <div className="text-center">
//           <Button className="bg-yellow-400 text-black font-bold">\u2192 Tap here to go deeper</Button>
//         </div>
//       </div>
//     </section>
//   )
// }

export const metadata = {
  title: 'About DeepDigiDive',
}

import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <section className="bg-[#0f0f1c] px-6 py-20 text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl font-heading font-bold text-yellow-300 text-center">About DeepDigiDive</h1>
        <p className="text-purple-300 text-center">You’re not early. You’re just paying closer attention than most.</p>
        <div className="space-y-6">
          <p className="text-purple-200">DeepDigiDive is not a brand. It’s a frequency—a pulse beneath the creator economy, the AI boom, the faceless empire movement.</p>
          <p className="text-purple-200">We build creators. We build systems. We build in silence.</p>
          <ul className="list-disc pl-5 text-purple-200 space-y-2">
            <li>Cinematic content — short-form built like trailers</li>
            <li>AI workflows — prompt engineering and automation</li>
            <li>Web assets — faceless websites, microbrands, productized funnels</li>
            <li>Multiple faceless websites and social channels</li>
            <li>Mentorship — training the next 100 killers in this space by 2030</li>
          </ul>
          <p className="text-purple-200">We don’t just post. We architect timelines.</p>
          <p className="text-purple-200">By 2030 I’ll reveal the full blueprint. Until then we’re stacking wins silently, systematically, successfully.</p>
          <p className="text-purple-200">Every site you stumble across could be one of ours. When the time is right, the mask comes off.</p>
        </div>
        <div className="text-center">
          <Button className="bg-yellow-400 text-black font-bold">\u2192 Tap here to go deeper</Button>
        </div>
      </div>
    </section>
  )
}