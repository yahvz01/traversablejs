declare class Gen {
    private from;
    private to;
    static to(from: number, to: number): Gen;
    static until(from: number, until: number): Gen;
    private constructor();
    toIter(): Array<number>;
    contains(index: number): boolean;
}
export default Gen;
//# sourceMappingURL=Gen.d.ts.map