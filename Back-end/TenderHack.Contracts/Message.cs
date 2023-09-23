namespace TenderHack.Contracts;

public class Message
{
    public DateTime CreationDate { get; set; }

    public string Value { get; set; } = string.Empty;

    public bool IsBot { get; set; }
}
