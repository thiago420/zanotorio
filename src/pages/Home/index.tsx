import { WritingText } from "@/components/animate-ui/text/writing";

const Home = () => {
  return (
    <>
      <div className="flex flex-col h-screen w-screen items-center justify-center">
        <WritingText
          text="Zanotório"
          className="text-[8rem] leading-[7rem]"
          transition={{ type: "spring", bounce: 0, duration: 2, delay: 0 }}
        />
        <WritingText
          text="Calculadora Somatório"
          spacing={12}
          className="text-[2rem] text-foreground/80"
          transition={{ type: "spring", bounce: 0, duration: 2, delay: 0.6 }}
        />
      </div>
    </>
  );
};

export default Home;
