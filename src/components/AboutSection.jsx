import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScaleBalanced } from '@fortawesome/free-solid-svg-icons';

function AboutSection() {
  return (
    <section className="bg-white py-16 md:py-24 font-sans">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 text-center text-amber-600">
            <FontAwesomeIcon icon={faScaleBalanced} size="6x" />
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">About Lawverse</h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              At Lawverse, our mission is to revolutionize the legal ecosystem by making legal support, knowledge, and justice accessible to everyone. We bridge the gap between the public and the legal system through a transparent, efficient, and user-friendly platform. By leveraging technology, we empower you to navigate the complexities of the law with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection;