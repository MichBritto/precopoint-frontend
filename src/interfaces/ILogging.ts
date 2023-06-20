export default interface ILogging {
    eventId: number,
    user: string,
    eventDate: string,
    level: string,
    logger: string,
    msg: string,
    throwable: string
}