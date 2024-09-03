'use client';

import { Api } from '@/shared/services/api-client';
import { IStory } from '@/shared/services/stories';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { X } from 'lucide-react';
import ReactStories from 'react-insta-stories';
import Image from 'next/image';

interface Props {
    className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
    const [stories, setStories] = React.useState<IStory[]>([]);
    const [open, setOpen] = React.useState(false);
    const [selectedStory, setSelectedStory] = React.useState<IStory>();

    React.useEffect(() => {
        async function fetchStories() {
            const data = await Api.stories.getAll();
            setStories(data);
        }

        fetchStories();
    }, []);

    const onClickStory = (story: IStory) => {
        setSelectedStory(story);

        if (story.items.length > 0) {
            setOpen(true);
        }
    };

    return (
        <div className={cn('flex items-center h-[270px] justify-between gap-2 mt-10 pb-1 overflow-x-scroll scrollbar', className)}>
            {stories.length === 0 &&
                [...Array(6)].map((_, index) => (
                    <div key={index} className="min-w-52 min-h-[256px] bg-gray-200 rounded-md animate-pulse" />
                ))
            }

            {stories.map((story) => (
                <Image
                    alt='story'
                    key={story.id}
                    onClick={() => onClickStory(story)}
                    className="rounded-md cursor-pointer min-w-52"
                    width={208}
                    height={256}
                    src={story.previewImageUrl}
                />
            ))}

            {open && (
                <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
                    <div className="relative h-screen w-auto" > {/* style={{ width: 520 }}*/}
                        <button className="absolute -right-10 z-30" onClick={() => setOpen(false)}>
                            <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
                        </button>

                        <ReactStories
                            onAllStoriesEnd={() => setOpen(false)}
                            stories={selectedStory?.items.map((item) => ({ url: item.sourceUrl })) || []}
                            defaultInterval={4000}
                            height={"100%"}
                            storyStyles={{}}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};