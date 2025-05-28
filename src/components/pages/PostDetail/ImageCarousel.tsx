import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useCallback } from "react";

interface IImageCarousel {
  images: string[];
}

export default function ImageCarousel({ images }: IImageCarousel) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <Carousel
      className="w-full max-w-xs"
      setApi={(api) => {
        if (api) {
          api.on("select", () => {
            handleSlideChange(api.selectedScrollSnap());
          });
        }
      }}
    >
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
      {currentIndex > 0 && <CarouselPrevious />}
      {currentIndex < images.length - 1 && <CarouselNext />}
    </Carousel>
  );
}
