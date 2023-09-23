namespace TenderHack.Core;

public class Message
{
    public int Id { get; set; }

    public DateTime CreationDate { get; set; }

    public int UserId { get; set; }

    public string Value { get; set; } = string.Empty;

    public bool IsBot { get; set; }
}
