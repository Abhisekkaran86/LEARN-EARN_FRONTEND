import Card from "../components/ui/Card";

const AboutPage = () => {
  return (
    <div className="bg-[#f8fafc] min-h-screen p-4 md:p-6">

      {/* HERO */}
      <div className="bg-gradient-to-r from-[#82C600] to-[#6ea800] text-white p-8 rounded-2xl mb-6">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="mt-2 text-sm opacity-90">
          Empowering students through creativity and competition.
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-2 gap-6">

        <Card>
          <h2 className="font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-600 text-sm">
            We aim to provide a platform where students can showcase their skills,
            compete globally, and grow through learning.
          </p>
        </Card>

        <Card>
          <h2 className="font-semibold mb-2">Our Vision</h2>
          <p className="text-gray-600 text-sm">
            To become the leading educational competition platform in the world.
          </p>
        </Card>

      </div>
    </div>
  );
};

export default AboutPage;