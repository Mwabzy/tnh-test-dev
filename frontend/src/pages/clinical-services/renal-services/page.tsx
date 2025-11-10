import Heading from '@/components/Heading';
import InsuranceSlider from '@/components/InsuranceSlider';
import { motion } from 'framer-motion';

const RenalServices = () => {
	return (
		<div className="min-h-screen bg-white">
			<Heading
				image_url="/src/assets/heroimages/renal.jpg"
				title="Renal Services"
				description="Comprehensive kidney care including dialysis and transplant support"
				style="background"
			/>

			<main className="container mx-auto px-4 py-12">
				<div className="max-w-4xl mx-auto text-center mb-8">
					<h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Renal & Dialysis Services</h2>
					<p className="text-gray-600">Offering haemodialysis, peritoneal dialysis, transplant assessment and multidisciplinary nephrology care.</p>
				</div>

				{/* Basic placeholder content */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
					<motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl p-6 shadow-sm">
						<h3 className="font-semibold mb-2">Dialysis Unit</h3>
						<p className="text-sm text-gray-700">State-of-the-art haemodialysis facilities with experienced nursing and nephrology support.</p>
					</motion.div>
					<motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white rounded-xl p-6 shadow-sm">
						<h3 className="font-semibold mb-2">Transplant Assessment</h3>
						<p className="text-sm text-gray-700">Comprehensive pre-transplant evaluation and post-transplant follow-up care.</p>
					</motion.div>
				</div>

				{/* Insurance Partners */}
				<InsuranceSlider />
			</main>
		</div>
	);
};

export default RenalServices;
