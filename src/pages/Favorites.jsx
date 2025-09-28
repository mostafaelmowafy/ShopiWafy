import FavoritesList from "../components/Favorites/FavoritesList";
import Heading from "../ui/Heading";

function Favorites() {
  return (
    <section className=" py-8 antialiased md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <Heading>Favorites</Heading>
        <FavoritesList />
      </div>
    </section>
  );
}

export default Favorites;
