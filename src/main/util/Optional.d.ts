declare class Optional<_Tp> {
    private data;
    static of<_Tp>(data: _Tp): Optional<_Tp>;
    private constructor();
    get(): _Tp | null;
    getOrElse(defaultData: _Tp): _Tp | null;
    ifPresent(consumer: (value: _Tp | null) => void): void;
    isPresent(data: _Tp | null): boolean;
}
export default Optional;
//# sourceMappingURL=Optional.d.ts.map