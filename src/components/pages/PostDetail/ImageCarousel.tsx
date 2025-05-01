import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface IImageCarousel {
  images: string[];
}

export default function ImageCarousel({ images }: IImageCarousel) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image}>
            <img
              src={image}
              alt="썸네일"
              className="w-[300px] h-[300px] rounded-lg object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
