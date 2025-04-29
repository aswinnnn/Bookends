interface RawJournal {
    id: string;
    title: string;
    content: string;
    tags: string;
    createdAt: string;
    updatedAt: string;
}

class RawJournal implements RawJournal {
    constructor(
        id: string,
        title: string,
        content: string,
        tags: string,
        createdAt: string,
        updatedAt: string
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    toJournal(): Journal {
        return new Journal (
            this.id,
            this.title,
            JSON.parse(this.content),
            this.tags.split(","),
            new Date(this.createdAt),
            new Date(this.updatedAt)
        )   }
}

interface Journal {
    id: string;
    title: string;
    content: JSON;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

class Journal implements Journal {
    constructor(
        id: string,
        title: string,
        content: JSON,
        tags: string[],
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    toRawJournal(): RawJournal {
        return new RawJournal(
            this.id,
            this.title,
            JSON.stringify(this.content),
            this.tags.join(","),
            this.createdAt.toISOString(),
            this.updatedAt.toISOString()
        );
    }
}

export { RawJournal, Journal };